import {
  IUserDetails,
  PermissionsModulesEnum,
  PermissionsSubModulesEnum,
} from 'src/app/modules/user-management/models/user.model';
import { UserService } from 'src/app/modules/user-management/services/user.service';

export function getPages(user: UserService) {
  return [
    user.checkModulePermissions(PermissionsModulesEnum.DASHBOARD)
      ? {
        group: 'Base',
        separator: false,
        items: [
          user.checkModulePermissions(PermissionsModulesEnum.DASHBOARD)
            ? {
              icon: 'assets/icons/heroicons/outline/chart-pie.svg',
              label: 'Dashboard',
              route: '/dashboard',
              children: [
                user.checkSubModulePermissions(PermissionsSubModulesEnum.ANALYTICAL)
                  ? { label: 'Analytical', route: '/dashboard/analytical' }
                  : null,
                user.checkSubModulePermissions(PermissionsSubModulesEnum.GEOPORTAL)
                  ? { label: 'Geoportal', route: '/dashboard/geoportal' }
                  : null,
              ].filter((item) => item !== null),
            }
            : null,
        ].filter((item) => item !== null),
      }
      : null,
    user.checkModulePermissions(PermissionsModulesEnum.ADMINISTRATIVE) ||
      user.checkModulePermissions(PermissionsModulesEnum.USER_MANAGEMENT)
      ? {
        group: 'Modules',
        separator: false,
        items: [
          user.checkModulePermissions(PermissionsModulesEnum.ADMINISTRATIVE)
            ? {
              icon: 'assets/icons/heroicons/outline/square.svg',
              label: 'Administrative',
              route: '/administrative',
              children: [
                user.checkSubModulePermissions(PermissionsSubModulesEnum.AMC_CONTRACTOR)
                  ? { label: 'AMC Contractor', route: '/administrative/amc-contractor' }
                  : null,
                user.checkSubModulePermissions(PermissionsSubModulesEnum.AUDIT_LOG)
                  ? { label: 'Audit Logs', route: '/administrative/audit-logs' }
                  : null,
                user.checkSubModulePermissions(PermissionsSubModulesEnum.FORM)
                  ? { label: 'Forms', route: '/administrative/forms' }
                  : null,
                user.checkSubModulePermissions(PermissionsSubModulesEnum.ACTIVITY) ?
                  { label: 'Activity', route: '/administrative/activity' }
                  : null,
                user.checkSubModulePermissions(PermissionsSubModulesEnum.PERMISSION) ?
                  { label: 'Permissions', route: '/administrative/permissions' }
                  : null,
                (user.checkSubModulePermissions(PermissionsSubModulesEnum.DEFECT_LOGS_MATRIX)
                  || user.checkSubModulePermissions(PermissionsSubModulesEnum.WORK_PERMIT_TYPE_OF_WORK)
                  || user.checkSubModulePermissions(PermissionsSubModulesEnum.WORK_PERMIT_FILE_TYPE)
                  || user.checkSubModulePermissions(PermissionsSubModulesEnum.CONFIGURATION)) ? {
                  label: 'Settings',
                  children: [
                    user.checkSubModulePermissions(PermissionsSubModulesEnum.DEFECT_LOGS_MATRIX)
                      ? { label: 'Defect Logs Matrix', route: '/administrative/defect-logs-matrix' }
                      : null,
                    user.checkSubModulePermissions(PermissionsSubModulesEnum.WORK_PERMIT_TYPE_OF_WORK)
                      ? { label: 'Work Permit Type of Work', route: '/administrative/work-permit-type-of-work' }
                      : null,
                    user.checkSubModulePermissions(PermissionsSubModulesEnum.WORK_PERMIT_FILE_TYPE)
                      ? { label: 'Work Permit File Types', route: '/administrative/work-permit-file-type' }
                      : null,
                    user.checkSubModulePermissions(PermissionsSubModulesEnum.CONFIGURATION) ?
                      { label: 'Configurations', route: '/administrative/configurations' }
                      : null,
                  ].filter((item) => item !== null),
                } : null
              ].filter((item) => item !== null),
            }
            : null,
          user.checkModulePermissions(PermissionsModulesEnum.USER_MANAGEMENT)
            ? {
              icon: 'assets/icons/heroicons/outline/users.svg',
              label: 'User Management',
              route: '/user-management',
              children: [
                user.checkSubModulePermissions(PermissionsSubModulesEnum.ROLE)
                  ? { label: 'Roles', route: '/user-management/roles' }
                  : null,
                user.checkSubModulePermissions(PermissionsSubModulesEnum.USER)
                  ? { label: 'Users', route: '/user-management/users' }
                  : null,
              ].filter((item) => item !== null),
            }
            : null,
        ].filter((item) => item !== null),
      }
      : null,
    user.checkModulePermissions(PermissionsModulesEnum.PROJECT_MANAGEMENT)
      ? {
        group: 'Projects',
        separator: true,
        items: [
          user.checkSubModulePermissions(PermissionsSubModulesEnum.PROJECT) ? {
            icon: 'assets/icons/heroicons/outline/brifcase.svg',
            label: 'Manage Projects',
            route: '/project-management/projects',
          } : null,
        ].filter((item) => item !== null),
      }
      : null,
    user.checkModulePermissions(PermissionsModulesEnum.REPORT) ? {
      group: 'Transaction',
      separator: true,
      items: [
        user.checkSubModulePermissions(PermissionsSubModulesEnum.TRANSACTION_DATA) ? {
          icon: 'assets/icons/heroicons/outline/note-svgrepo-com.svg',
          label: 'Form Collection',
          route: '/reports/transaction',
        } : null
      ].filter((item) => item !== null),
    } : null,
  ].filter((item) => item !== null);
}
