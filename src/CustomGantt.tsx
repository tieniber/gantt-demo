import {
    ReactElement,
    createElement,
    Fragment,
    /* FunctionComponent,*/ useCallback,
    useRef,
    useState,
    useMemo
} from "react";

import { BryntumButton, BryntumGantt, BryntumGanttProjectModel } from "@bryntum/gantt-react";
import {
    DateHelper,
    TaskModelConfig,
    TaskModel
    /*
    CalendarModel, SchedulerProCalendarIntervalModel, 
    AssignmentModel, BaselineConfig, /*Store, StoreConfig, ModelConfig
    DependencyModel*/
} from "@bryntum/gantt";
import { ganttConfig, projectConfig } from "./GanttConfig";
import * as initialData from "./components/initialData";
// import { getDate } from './components/initialData';
import { ObjectItem, ValueStatus } from "mendix";
import "./ui/CustomGantt.scss";

import { CustomGanttContainerProps } from "../typings/CustomGanttProps";
// import { BadgeSample } from "./components/BadgeSample";

export interface ITask {
    obj: ObjectItem;
    id: number | undefined;
    parentId: number | undefined;
    name: string | undefined;
    percentDone: number;
    rollup: boolean;
    expanded: boolean;
    children: ITask[];
    startDate?: Date;
}

export function convertTaskTree(oldTask: ITask) {
    const newTask = {
        id: oldTask.id,
        name: oldTask.name || "",
        expanded: true,
        percentDone: 50,
        rollup: false,
        startDate: initialData.getDate(1),
        children: oldTask.children.map(convertTaskTree)
    } as TaskModel;
    return newTask;
}

const mapMxID = (mxID: string | Big | undefined): string | undefined =>
    mxID ? (typeof mxID === "string" ? mxID : mxID.toString()) : undefined;

export function CustomGantt(props: CustomGanttContainerProps): ReactElement {
    const gantt = useRef<BryntumGantt>(null);
    const project = useRef<BryntumGanttProjectModel>(null);
    const [dataSet, setDataSet] = useState(0);

    // const [tasks, setTasks] = useState(initialData.tasks);
    const [assignments, setAssignments] = useState(initialData.assignments);
    const [dependencies, setDependencies] = useState(initialData.dependencies);
    const [resources, setResources] = useState(initialData.resources);
    const [timeRanges, setTimeRanges] = useState(initialData.timeRanges);
    const [calendars, setCalendars] = useState(initialData.calendars);
    console.info("CustomGantt props1", dependencies);
    // let bryntumTask: TaskModel
    // let children1: TaskModel[] = []
    // 从 mendix api 获取的数据 转换到前端的对象
    const bryntumTasks = useMemo(() => {
        const bryntumTasks: TaskModelConfig[] = [];
        if (props.objectList.status === ValueStatus.Available && props.objectList.items) {
            // mendix 数据是否可用
            const flatTaskList: ITask[] = [];
            // Iterator through the Mendix data and make a flat array of tasks (all children attributes are empty)
            for (const objItem of props.objectList.items) {
                const newId = props.id.get(objItem).value; // Example of how to parse the data from Mendix
                // only create a task if it's ID is valid
                if (newId) {
                    const newTask: ITask = {
                        obj: objItem,
                        id: newId.toNumber(),
                        parentId: props.parentId.get(objItem).value?.toNumber(),
                        name: props.taskName.get(objItem).value,
                        children: [],
                        percentDone: 30,
                        rollup: false,
                        expanded: false,
                        startDate: undefined
                    };
                    flatTaskList.push(newTask);
                }
            }
            console.info("useMemo creates flatTaskList", flatTaskList);

            const sortedTasks = flatTaskList.sort((a, b) => (a.parentId ? -1 : b.parentId ? 1 : 0));
            // console.info("useMemo sortedTasks", sortedTasks);
            for (const task of sortedTasks) {
                if (task.parentId) {
                    const parentTask = flatTaskList.find(t => t.id === task.parentId);
                    if (parentTask) {
                        const foundIndex = flatTaskList.indexOf(parentTask);
                        parentTask.children.push(task);
                        flatTaskList[foundIndex] = parentTask;
                    }
                }
            }
            console.info("useMemo processed flatTaskList", flatTaskList);
            const taskByProject = flatTaskList.find(t => t.parentId === undefined);
            if (taskByProject) {
                bryntumTasks.push(convertTaskTree(taskByProject));
                console.info("useMemo bryntumTasks", bryntumTasks);
                console.info("hardcoded task data ", initialData.tasks);
            }
        }
        return bryntumTasks;
    }, [props.objectList, props.id, props.parentId, props.taskName]);
    // const [tasks, setTasks] = useState(bryntumTasks);

    return (
        <div id="container">
            <Fragment>
                {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
                <div className="demo-toolbar align-right">
                    <BryntumButton text="Change Data" cls="b-raised b-blue" />
                </div>
                <BryntumGanttProjectModel
                    ref={project}
                    {...projectConfig}
                    calendars={calendars}
                    tasks={bryntumTasks}
                    assignments={assignments}
                    dependencies={dependencies}
                    resources={resources}
                    timeRanges={timeRanges}
                />
                <BryntumGantt ref={gantt} {...ganttConfig} project={project} />
            </Fragment>
        </div>
    );
}
