"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalConstraints = void 0;
const validators_1 = require("../../common/validators");
exports.approvalConstraints = {
    'approvalList.director': {
        validateApprovalListPerson: {
            userRole: 'approvalList.directorUser'
        }
    },
    'approvalList.departmentHead': {
        validateApprovalListDepHead: {
            userRole: 'departmentHeadUser'
        }
    },
    'approvalList.dean': {
        validateApprovalListDepHead: {
            userRole: 'deanUser'
        }
    },
    'general.year': {
        numericality: validators_1.validationYearSet
    },
    'approvalList.approvalData': {
        validateApprovalListData: {
            field: {
                columnDefs: [
                    { headerName: 'Факультет', field: 'faculty', colId: 'faculty' },
                    { headerName: 'Учебный год', field: 'year', colId: 'year' },
                    {
                        headerName: '№ Протокола',
                        field: 'protocolNumber',
                        colId: 'protocolNumber'
                    },
                    {
                        headerName: 'Дата заседания',
                        field: 'date',
                        colId: 'date',
                        cellEditorFramework: 'DateEditor'
                    },
                    {
                        headerName: 'Председатель',
                        field: 'leader',
                        colId: 'leader'
                    }
                ]
            }
        }
    }
};
