/**
 * This file was generated from CustomGantt.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type CustomganttTypeEnum = "badge" | "label";

export interface CustomGanttContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    customganttValue: string;
    objectList: ListValue;
    id: ListAttributeValue<Big | string>;
    parentId: ListAttributeValue<string>;
    taskName: ListAttributeValue<string>;
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
    customganttValue: string;
    objectList: {} | { caption: string } | { type: string } | null;
    id: string;
    parentId: string;
    taskName: string;
    bootstrapStyle: BootstrapStyleEnum;
    customganttType: CustomganttTypeEnum;
    onClickAction: {} | null;
}
