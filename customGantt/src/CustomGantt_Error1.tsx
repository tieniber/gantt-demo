import { ReactElement, createElement, Fragment, /*FunctionComponent,*/ useRef/*, useCallback*/, useMemo } from "react";

import { BryntumDemoHeader, BryntumGantt } from '@bryntum/gantt-react';
import {
    TaskModel, CalendarModel, SchedulerProCalendarIntervalModel, AssignmentModel, BaselineConfig, /*Store, StoreConfig, ModelConfig*/
    DependencyModel
} from '@bryntum/gantt';
//import { ganttProps/*, projectProps*/ } from './GanttConfig';
import { ValueStatus } from "mendix";
import './ui/CustomGantt.scss';

import { CustomGanttContainerProps } from "../typings/CustomGanttProps";
//import { BadgeSample } from "./components/BadgeSample";

export function CustomGantt(props: CustomGanttContainerProps): ReactElement {
    const gantt = useRef<BryntumGantt>(null);
    let calendars = []
    let tasks = []
    let baselines: BaselineConfig[] = []
    let baseline1: BaselineConfig = {
        startDate: new Date(2022, 3, 13),
        endDate: new Date(2022, 3, 16),
    }
    baselines.push(baseline1)
    let baselines2: BaselineConfig[] = []
    let baseline2: BaselineConfig = {
        startDate: new Date(2022, 3, 13),
        endDate: new Date(2022, 5, 15),
    }
    baselines2.push(baseline2)
    let assignments = []
    let dependencies = []

    const newTask1 = new TaskModel({
        id: 1000,
        name: 'Launch SaaS Product',
        percentDone: 50,
        startDate: new Date(2022, 3, 14),
        expanded: true,
        children: [new TaskModel({
            id: 1,
            name: 'Setup web server',
            percentDone: 50,
            duration: 10,
            startDate: new Date(2022, 3, 14),
            rollup: true,
            endDate: new Date(2022, 3, 23),
            expanded: true,
            children: [new TaskModel({
                id: 11,
                name: 'Install Apache',
                percentDone: 50,
                startDate: new Date(2022, 3, 14),
                rollup: true,
                duration: 3,
                color: "teal",
                endDate: new Date(2022, 3, 17),
                expanded: true,
                cost: 200,
                baselines: baselines,
            })],

        })],
        endDate: new Date(2022, 5, 16),
        baselines: baselines2,
    });
    tasks.push(newTask1)

    const calendar1 = new CalendarModel({
        id: 'general',
        name: 'General',
        intervals: [new SchedulerProCalendarIntervalModel({
            recurrentStartDate: "on Sat at 0:00",
            recurrentEndDate: "on Mon at 0:00",
            isWorking: false
        })],
        expanded: true,
    });
    calendars.push(calendar1);

    const assignment1 = new AssignmentModel({
        id: 1,
        event: 11,
        resource: 1
    });
    assignments.push(assignment1);

    const dependency1 = new DependencyModel({
        id: 1,
        fromTask: 11,
        lag: 2
    });
    dependencies.push(dependency1);

    // 从 mendix api 获取的数据 转换到前端的对象
    /*const data =*/ useMemo(() => { //TODO: 分析出task，放到 BryntumGantt
        if (props.data.status === ValueStatus.Available) { // mendix 数据是否可用
            //props.data.items // items对接 mendix entity object
            props.data.items?.map(item => {
                console.dir(props.TaskId.get(item).value) // get task id from mendix api sucessfully.
                console.dir(props.TaskName.get(item).value)
                debugger
            })
        }
        //console.dir("gantt data")
        //console.dir(ganttProps)
    }, [props.data]);
    //console.dir(data)
    // const { customganttType, customganttValue, valueAttribute, onClickAction, style, bootstrapStyle } = props;
    // const onClickHandler = useCallback(() => {
    //     if (onClickAction && onClickAction.canExecute) {
    //         onClickAction.execute();
    //     }
    // }, [onClickAction]);

    return (
        <Fragment>
            <BryntumDemoHeader />
            <BryntumGantt
                ref={gantt}
                //calendars={calendars}
                tasks={tasks}
                assignments={assignments}
                dependencies={dependencies}
            //resources ={} 
            //{...ganttProps} 
            />
        </Fragment>
        // <BadgeSample
        //     type={customganttType}
        //     bootstrapStyle={bootstrapStyle}
        //     className={props.class}
        //     clickable={!!onClickAction}
        //     defaultValue={customganttValue ? customganttValue : ""}
        //     onClickAction={onClickHandler}
        //     style={style}
        //     value={valueAttribute ? valueAttribute.displayValue : ""}
        // />
    );
}

