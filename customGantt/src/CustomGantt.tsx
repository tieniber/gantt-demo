import { ReactElement, createElement, Fragment, /*FunctionComponent,*/ useCallback, useRef, useState, useMemo } from "react";

import { BryntumButton, BryntumGantt, BryntumGanttProjectModel } from '@bryntum/gantt-react';
import {
    DateHelper
    /*
    TaskModel, CalendarModel, SchedulerProCalendarIntervalModel, 
    AssignmentModel, BaselineConfig, /*Store, StoreConfig, ModelConfig
    DependencyModel*/
} from '@bryntum/gantt';
import { ganttConfig, projectConfig } from './GanttConfig';
import * as initialData from './components/initialData';
import { ValueStatus } from "mendix";
import './ui/CustomGantt.scss';

import { CustomGanttContainerProps } from "../typings/CustomGanttProps";
//import { BadgeSample } from "./components/BadgeSample";

export function CustomGantt(props: CustomGanttContainerProps): ReactElement {
    const gantt = useRef<BryntumGantt>(null);
    const project = useRef<BryntumGanttProjectModel>(null);
    const [dataSet, setDataSet] = useState(0);

    const [tasks, setTasks] = useState(initialData.tasks);
    const [assignments, setAssignments] = useState(initialData.assignments);
    const [dependencies, setDependencies] = useState(initialData.dependencies);
    const [resources, setResources] = useState(initialData.resources);
    const [timeRanges, setTimeRanges] = useState(initialData.timeRanges);
    const [calendars, setCalendars] = useState(initialData.calendars);

// 从 mendix api 获取的数据 转换到前端的对象
    /*const data =*/ useMemo(() => { //TODO: 分析出task，放到 BryntumGantt
        if (props.data.status === ValueStatus.Available) { // mendix 数据是否可用
            //props.data.items // items对接 mendix entity object
            props.data.items?.map(item => {
                console.dir(props.TaskId.get(item).value) // get task id from mendix api sucessfully.
                console.dir(props.TaskName.get(item).value)

                // gantt column data
                // Phase/Task/Action Name
                // Task ID
                // Actions
                // Order [类似WBS]
                // 
            })
        }
        //console.dir("gantt data")
        //console.dir(ganttProps)
    }, [props.data]);



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
                    dependencies={dependencies}
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

