import { operationActionsFactory } from "src/core/commons/operation/operation.actions";

export const getMeasurementsActions = operationActionsFactory<any, any>(
    '[measurements] get data'
)