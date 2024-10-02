/**
 * Initial data for gantt
 */
import { DateHelper, ResourceModel, TaskModel, TaskModelConfig } from "@bryntum/gantt";

export function getDate(delta: number): Date {
    const today = DateHelper.clearTime(new Date());
    return DateHelper.add(today, delta, "day");
}

const calendars = [
    {
        id: "general",
        name: "General",
        intervals: [
            {
                recurrentStartDate: "on Sat at 0:00",
                recurrentEndDate: "on Mon at 0:00",
                isWorking: false
            }
        ],
        expanded: true,
        children: [
            {
                id: "business",
                name: "Business",
                intervals: [
                    {
                        recurrentStartDate: "every weekday at 12:00",
                        recurrentEndDate: "every weekday at 13:00",
                        isWorking: false
                    },
                    {
                        recurrentStartDate: "every weekday at 17:00",
                        recurrentEndDate: "every weekday at 08:00",
                        isWorking: false
                    }
                ]
            },
            {
                id: "night",
                name: "Night shift",
                intervals: [
                    {
                        recurrentStartDate: "every weekday at 6:00",
                        recurrentEndDate: "every weekday at 22:00",
                        isWorking: false
                    }
                ]
            }
        ]
    }
];

const tasks: TaskModelConfig[] | undefined = [
    {
        id: 1000,
        name: "Launch SaaS Product",
        startDate: getDate(0),
        percentDone: 50,
        expanded: true,
        children: [
            {
                id: 1,
                name: "Setup web server",
                percentDone: 50,
                duration: 10,
                rollup: true,
                expanded: true,
                children: [
                    {
                        id: 11,
                        name: "Install Apache",
                        percentDone: 50,
                        rollup: true,
                        duration: 3,
                        color: "teal"
                    },
                    {
                        id: 12,
                        name: "Configure firewall",
                        percentDone: 50,
                        rollup: true,
                        duration: 3,
                        showInTimeline: true
                    },
                    {
                        id: 13,
                        name: "Setup load balancer",
                        percentDone: 50,
                        rollup: true,
                        duration: 3
                    },
                    {
                        id: 14,
                        name: "Configure ports",
                        percentDone: 50,
                        rollup: true,
                        duration: 2
                    },
                    {
                        id: 15,
                        name: "Run tests",
                        percentDone: 0,
                        rollup: true,
                        duration: 2
                    }
                ]
            },
            {
                id: 2,
                name: "Website Design",
                percentDone: 60,
                rollup: true,
                expanded: true,
                children: [
                    {
                        id: 21,
                        name: "Contact designers",
                        percentDone: 70,
                        rollup: true,
                        duration: 5
                    },
                    {
                        id: 22,
                        name: "Create shortlist of three designers",
                        percentDone: 60,
                        rollup: true,
                        duration: 1
                    },
                    {
                        id: 23,
                        name: "Select & review final design",
                        percentDone: 50,
                        rollup: true,
                        duration: 2,
                        showInTimeline: true
                    },
                    {
                        id: 24,
                        name: "Inform management about decision",
                        percentDone: 100,
                        rollup: true,
                        duration: 0
                    },
                    {
                        id: 25,
                        name: "Apply design to web site",
                        percentDone: 0,
                        rollup: true,
                        duration: 7
                    }
                ]
            },
            {
                id: 3,
                name: "Setup Test Strategy",
                percentDone: 20,
                expanded: true,
                children: [
                    {
                        id: 31,
                        name: "Hire QA staff",
                        percentDone: 40,
                        duration: 5
                    },
                    {
                        id: 33,
                        name: "Write test specs",
                        percentDone: 9,
                        duration: 5,
                        expanded: true,
                        children: [
                            {
                                id: 331,
                                name: "Unit tests",
                                percentDone: 20,
                                duration: 10,
                                showInTimeline: true
                            },
                            {
                                id: 332,
                                name: "UI unit tests / individual screens",
                                percentDone: 10,
                                duration: 5,
                                showInTimeline: true
                            },
                            {
                                id: 333,
                                name: "Application tests",
                                percentDone: 0,
                                duration: 10
                            },
                            {
                                id: 334,
                                name: "Monkey tests",
                                percentDone: 0,
                                duration: 1
                            }
                        ]
                    }
                ]
            },
            {
                id: 4,
                name: "Application Implementation",
                percentDone: 60,
                expanded: true,
                children: [
                    {
                        id: 400,
                        name: "Phase #1",
                        expanded: true,
                        children: [
                            {
                                id: 41,
                                name: "Authentication module",
                                percentDone: 100,
                                duration: 5
                            },
                            {
                                id: 42,
                                name: "Single sign on",
                                percentDone: 100,
                                duration: 3
                            },
                            {
                                id: 43,
                                name: "Implement role based access",
                                percentDone: 0,
                                duration: 4
                            },
                            {
                                id: 44,
                                name: "Basic test coverage",
                                showInTimeline: true,
                                percentDone: 0,
                                duration: 3
                            },
                            {
                                id: 45,
                                name: "Verify high test coverage",
                                percentDone: 0,
                                duration: 2
                            },
                            {
                                id: 46,
                                name: "Make backup",
                                percentDone: 0,
                                duration: 0,
                                showInTimeline: true,
                                rollup: true
                            }
                        ]
                    },
                    {
                        id: 401,
                        name: "Phase #2",
                        expanded: true,
                        children: [
                            {
                                id: 4011,
                                name: "Authentication module",
                                percentDone: 70,
                                duration: 8
                            },
                            {
                                id: 4012,
                                name: "Single sign on",
                                percentDone: 60,
                                duration: 5
                            },
                            {
                                id: 4013,
                                name: "Implement role based access",
                                percentDone: 50,
                                duration: 14
                            },
                            {
                                id: 4014,
                                name: "Basic test coverage",
                                percentDone: 0,
                                duration: 15
                            },
                            {
                                id: 4015,
                                name: "Verify high test coverage",
                                percentDone: 0,
                                duration: 4
                            }
                        ]
                    },
                    {
                        id: 402,
                        name: "Acceptance phase",
                        expanded: true,
                        children: [
                            {
                                id: 4031,
                                name: "Company bug bash",
                                percentDone: 70,
                                duration: 3
                            },
                            {
                                id: 4032,
                                name: "Test all web pages",
                                percentDone: 60,
                                duration: 2
                            },
                            {
                                id: 4033,
                                name: "Verify no broken links",
                                percentDone: 50,
                                duration: 4
                            },
                            {
                                id: 4034,
                                name: "Make test release",
                                percentDone: 0,
                                duration: 3
                            },
                            {
                                id: 4035,
                                name: "Send invitation email",
                                percentDone: 0,
                                duration: 0
                            },
                            {
                                id: 4036,
                                name: "Celebrate launch",
                                iconCls: "b-fa b-fa-glass-cheers",
                                percentDone: 0,
                                duration: 1
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const dependencies = [
    {
        id: 1,
        fromTask: 11,
        toTask: 15,
        lag: 2
    },
    {
        id: 2,
        fromTask: 12,
        toTask: 15
    },
    {
        id: 3,
        fromTask: 13,
        toTask: 15
    },
    {
        id: 4,
        fromTask: 14,
        toTask: 15
    },
    {
        id: 5,
        fromTask: 15,
        toTask: 21
    },
    {
        id: 7,
        fromTask: 21,
        toTask: 22
    },
    {
        id: 8,
        fromTask: 22,
        toTask: 23
    },
    {
        id: 9,
        fromTask: 23,
        toTask: 24
    },
    {
        id: 10,
        fromTask: 24,
        toTask: 25
    },
    {
        id: 11,
        fromTask: 31,
        toTask: 331
    },
    {
        id: 111,
        fromTask: 31,
        toTask: 332
    },
    {
        id: 112,
        fromTask: 31,
        toTask: 333
    },
    {
        id: 113,
        fromTask: 31,
        toTask: 334
    },
    {
        id: 12,
        fromTask: 400,
        toTask: 401
    },
    {
        id: 13,
        fromTask: 401,
        toTask: 402
    },
    {
        id: 15,
        fromTask: 3,
        toTask: 4
    },
    {
        id: 16,
        fromTask: 41,
        toTask: 45
    },
    {
        id: 17,
        fromTask: 42,
        toTask: 45
    },
    {
        id: 18,
        fromTask: 43,
        toTask: 45
    },
    {
        id: 19,
        fromTask: 44,
        toTask: 45
    },
    {
        id: 20,
        fromTask: 4034,
        toTask: 4035
    }
];

const resources = [
    new ResourceModel({
        id: 1,
        name: "Celia",
        city: "Barcelona",
        calendar: null,
        image: "celia.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 2,
        name: "Lee",
        city: "London",
        calendar: null,
        image: "lee.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 3,
        name: "Macy",
        city: "New York",
        calendar: null,
        image: "macy.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 4,
        name: "Madison",
        city: "Barcelona",
        calendar: null,
        image: "madison.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 5,
        name: "Rob",
        city: "Rome",
        calendar: "business",
        image: "rob.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 6,
        name: "Dave",
        city: "Barcelona",
        calendar: "night",
        image: "dave.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 7,
        name: "Dan",
        city: "London",
        calendar: "night",
        image: "dan.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 8,
        name: "George",
        city: "New York",
        calendar: null,
        image: "george.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 9,
        name: "Gloria",
        city: "Rome",
        calendar: null,
        image: "gloria.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    }),
    new ResourceModel({
        id: 10,
        name: "Henrik",
        city: "London",
        calendar: null,
        image: "henrik.jpg",
        events: [],
        allowOverlap: false,
        barMargin: 0
    })
];

const assignments = [
    { id: 1, event: 11, resource: 1 },
    { id: 2, event: 4033, resource: 1 },
    { id: 3, event: 12, resource: 9 },
    { id: 4, event: 13, resource: 2 },
    { id: 5, event: 13, resource: 3 },
    { id: 6, event: 13, resource: 6 },
    { id: 7, event: 13, resource: 7 },
    { id: 8, event: 13, resource: 8 },
    { id: 9, event: 21, resource: 5 },
    { id: 10, event: 21, resource: 9 },
    { id: 11, event: 22, resource: 8 },
    { id: 12, event: 25, resource: 3 }
];

const timeRanges = [
    {
        id: 1,
        name: "Important date",
        startDate: getDate(14),
        duration: 0,
        durationUnit: "d",
        cls: "b-fa b-fa-diamond"
    }
];

export { calendars, assignments, dependencies, tasks, resources, timeRanges };
