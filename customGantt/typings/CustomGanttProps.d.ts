/**
 * This file was generated from CustomGantt.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type CustomganttTypeEnum = "badge" | "label";

export interface CustomGanttContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttribute?: EditableValue<string | Big>;
    customganttValue: string;
    data: ListValue;
    TaskId: ListAttributeValue<string>;
    TaskName: ListAttributeValue<string>;
    bootstrapStyle: BootstrapStyleEnum;
    customganttType: CustomganttTypeEnum;
    onClickAction?: ActionValue;
}

export interface CustomGanttPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    valueAttribute: string;
    customganttValue: string;
    data: {} | { caption: string } | { type: string } | null;
    TaskId: string;
    TaskName: string;
    bootstrapStyle: BootstrapStyleEnum;
    customganttType: CustomganttTypeEnum;
    onClickAction: {} | null;
}
