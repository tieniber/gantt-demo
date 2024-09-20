/**
 * Application configuration
 */
import { DateHelper } from '@bryntum/gantt';
import { BryntumGanttProjectModelProps, BryntumGanttProps } from "@bryntum/gantt-react";

const startDate = DateHelper.add(DateHelper.clearTime(new Date()), -7, 'day');

export const projectConfig: BryntumGanttProjectModelProps = {
    calendar: 'general',
    autoSetConstraints: true,
    startDate,
    hoursPerDay: 24,
    daysPerWeek: 5,
    daysPerMonth: 20
};

export const ganttConfig: BryntumGanttProps = {
    autoHeight: true, // Set to true to enable auto-height manually
    //criticalPathsFeature: { disabled: false }, // Enable critical paths feature
    columns: [
        { type: 'name', width: 360 },
        //{ type: 'startdate', field: 'startDate' },
        //{ type: 'enddate', field: 'endDate' },
    ],
    timeRangesFeature: {
        showHeaderElements: true,
        showCurrentTimeLine: true
    },
    viewPreset: 'weekAndDayLetter'
};
