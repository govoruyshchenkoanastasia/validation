import { validationYearSet } from '@/validation/common/validators'

export const approvalConstraints = {
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
    numericality: validationYearSet
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
}
