import { ReactElement, createElement, Fragment, /*FunctionComponent,*/ useCallback, useRef, useState, useMemo } from "react";

import { BryntumButton, BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-react';
import {
    DateHelper,

    TaskModelConfig,
    TaskModel
    /*
    CalendarModel, SchedulerProCalendarIntervalModel, 
    AssignmentModel, BaselineConfig, /*Store, StoreConfig, ModelConfig
    DependencyModel*/
} from '@bryntum/gantt';
import { ganttConfig, projectConfig } from './GanttConfig';
import * as initialData from './components/initialData';
//import { getDate } from './components/initialData';
import { ObjectItem, ValueStatus } from "mendix";
import './ui/CustomGantt.scss';

import { CustomGanttContainerProps } from "../typings/CustomGanttProps";
//import { BadgeSample } from "./components/BadgeSample";

export interface ITask {
    obj: ObjectItem;
    id: string;
    parentId: string | undefined;
    taskName: string | undefined;
    children: ITask[];
}

export function convertTaskTree(oldTask: ITask) {
    const newTask= {
        id: oldTask.id,
        name: oldTask.taskName || '',
        expanded: true,
        percentDone : 50,
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

    
    const [assignments, setAssignments] = useState(initialData.assignments);
    const [dependencies, setDependencies] = useState(initialData.dependencies);
    const [resources, setResources] = useState(initialData.resources);
    const [timeRanges, setTimeRanges] = useState(initialData.timeRanges);
    const [calendars, setCalendars] = useState(initialData.calendars);
    console.info("CustomGantt props1", dependencies);
    //let bryntumTask: TaskModel
    //let children1: TaskModel[] = []
    // 从 mendix api 获取的数据 转换到前端的对象
    const bryntumTasks = useMemo(() => {
        if (props.objectList.status === ValueStatus.Available && props.objectList.items) { // mendix 数据是否可用
            const flatTaskList: ITask[] = [];
            const bryntumTasks: TaskModelConfig[] = [];
            // Iterator through the Mendix data and make a flat array of tasks (all children attributes are empty)
            for (const objItem of props.objectList.items) {
                const newId = mapMxID(props.id.get(objItem).value); // Example of how to parse the data from Mendix

                // only create a task if it's ID is valid
                if (newId) {
                    const newTask: ITask = {
                        obj: objItem,
                        id: newId,
                        parentId: mapMxID(props.parentId.get(objItem).value),
                        taskName: props.taskName.get(objItem).value,
                        children: []
                    };
                    flatTaskList.push(newTask);
                }
            }
            console.info("useMemo creates flatTaskList", flatTaskList);


            const sortedTasks = flatTaskList.sort((a, b) => (a.parentId ? -1 : b.parentId ? 1 : 0))
            //console.info("useMemo sortedTasks", sortedTasks);
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
                return bryntumTasks;
            }
            else {
                console.info("useMemo no task found with parentId undefined");
            }



            /*const taskByProject = flatTaskList.find(t => t.parentId === undefined);
            //const existingBryntumTask = bryntumTasks.find(t => t.id === taskByProject?.id);
            //if (existingBryntumTask === undefined) {
            bryntumTasks.push({
                id: taskByProject?.id ?? "10000",
                name: taskByProject?.taskName ?? "",
                expanded: true,
                children: []
            })
            //}

            const phaseList = flatTaskList.filter(t => t.parentId === taskByProject?.id)
            for (const phase of phaseList) {
                if (bryntumTasks.length === 0) {
                    bryntumTasks[0] = { children: [] };
                }

                bryntumTasks[0].children.push(({
                    id: phase.id,
                    name: phase.taskName,
                    expanded: true,
                    children: []
                }))
*/
        }
    }, [props.objectList, props.id, props.parentId, props.taskName]);
    const [tasks, setTasks] = useState(bryntumTasks);
    const dataChangeHandler = useCallback(() => {
        // Clean tasks
        setTasks([]);

        if (dataSet === 0) {
            setTasks([
                {
                    id: 1,
                    name: 'Task 1',
                    expanded: true,
                    children: [
                        { id: 11, name: 'Subtask 11', percentDone: 30, duration: 10, rollup: true, expanded: true, children: [] },
                        { id: 12, name: 'Subtask 12', percentDone: 67, duration: 5, rollup: true, expanded: true, children: [] }
                    ],
                    startDate: new Date(2022, 3, 14),
                    percentDone: 0
                },
                {
                    id: 2,
                    name: 'Task 2',
                    expanded: true,
                    children: [
                        { id: 21, name: 'Subtask 21', percentDone: 14, duration: 3, rollup: true, expanded: true, children: [] },
                        { id: 22, name: 'Subtask 22', percentDone: 94, duration: 7, rollup: true, expanded: true, children: [] },
                        { id: 23, name: 'Subtask 23', percentDone: 7, duration: 8, rollup: true, expanded: true, children: [] }
                    ],
                    startDate: new Date(2022, 3, 14),
                    percentDone: 0
                }
            ]);
            setDependencies([
                { id: 1, fromTask: 11, toTask: 12 },
                { id: 2, fromTask: 1, toTask: 21 },
                { id: 3, fromTask: 21, toTask: 22 },
                { id: 4, fromTask: 21, toTask: 23 }
            ]);
            setTimeRanges([
                {
                    id: 1,
                    name: 'Important date',
                    startDate: DateHelper.add(DateHelper.clearTime(new Date()), 15, 'day'),
                    duration: 0,
                    durationUnit: 'd',
                    cls: 'b-fa b-fa-diamond'
                }
            ]);

            setDataSet(1);
        }
        else {
            setTasks(initialData.tasks);
            setAssignments(initialData.assignments);
            setDependencies(initialData.dependencies);
            setResources(initialData.resources);
            setTimeRanges(initialData.timeRanges);
            setCalendars(initialData.calendars);

            setDataSet(0);
        }
    }, [dataSet]);

    return (
        <div id="container">
            <Fragment>
                {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
                <div className="demo-toolbar align-right">
                    <BryntumButton
                        text="Change Data"
                        cls="b-raised b-blue"
                        onAction={dataChangeHandler}
                    />
                </div>
                <BryntumGanttProjectModel
                    ref={project}
                    {...projectConfig}
                    calendars={calendars}
                    tasks={tasks}
                    assignments={assignments}
                    //dependencies={dependencies}
                    resources={resources}
                    timeRanges={timeRanges}
                />
                <BryntumGantt
                    ref={gantt}
                    {...ganttConfig}
                    project={project}
                />
            </Fragment>
        </div>

    );
}

