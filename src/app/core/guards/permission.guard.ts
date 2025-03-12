import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionsEnum, PermissionsSubModulesEnum } from 'src/app/modules/user-management/models/user.model';
import { UserService } from 'src/app/modules/user-management/services/user.service';
import { STATIC_VALUES } from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard {

  canActivate(userContext: UserService, _snackbarContext: MatSnackBar, router: Router, route: ActivatedRouteSnapshot): boolean {
    const routePermissionsMap = [
      { path: 'dashboard/analytical', permission: PermissionsSubModulesEnum.ANALYTICAL, autoRedirect: true },
      { path: 'dashboard/geoportal', permission: PermissionsSubModulesEnum.GEOPORTAL, autoRedirect: true },
      { path: 'dashboard/geoportal/tower-visit-monitor', permission: PermissionsSubModulesEnum.GEOPORTAL, autoRedirect: false, componentPermission: PermissionsEnum.DASHBOARD_GEOPORTAL_TOWER_VISIT_MONITORING },
      { path: 'administrative/amc-contractor', permission: PermissionsSubModulesEnum.AMC_CONTRACTOR, autoRedirect: true },
      { path: 'administrative/audit-logs', permission: PermissionsSubModulesEnum.AUDIT_LOG, autoRedirect: true },
      { path: 'administrative/forms', permission: PermissionsSubModulesEnum.FORM, autoRedirect: true },
      { path: 'administrative/forms/config', permission: PermissionsSubModulesEnum.FORM, autoRedirect: false, componentPermission: PermissionsEnum.ADMINISTRATIVE_FORM_CREATE },
      { path: 'administrative/forms/config/form-builder', permission: PermissionsSubModulesEnum.FORM, autoRedirect: false, componentPermission: PermissionsEnum.ADMINISTRATIVE_FORM_CREATE },
      { path: 'administrative/forms/version', permission: PermissionsSubModulesEnum.FORM, autoRedirect: false, componentPermission: PermissionsEnum.ADMINISTRATIVE_FORM_LIST },
      { path: 'administrative/activity', permission: PermissionsSubModulesEnum.ACTIVITY, autoRedirect: true },
      { path: 'administrative/permissions', permission: PermissionsSubModulesEnum.PERMISSION, autoRedirect: true },
      { path: 'administrative/permissions/request', permission: PermissionsSubModulesEnum.PERMISSION_REQUEST, autoRedirect: false },
      { path: 'administrative/configurations', permission: PermissionsSubModulesEnum.CONFIGURATION, autoRedirect: true },
      { path: 'administrative/configurations/request', permission: PermissionsSubModulesEnum.CONFIGURATION_REQUEST, autoRedirect: false },
      { path: 'administrative/defect-logs-matrix', permission: PermissionsSubModulesEnum.DEFECT_LOGS_MATRIX, autoRedirect: true },
      { path: 'administrative/work-permit-type-of-work', permission: PermissionsSubModulesEnum.WORK_PERMIT_TYPE_OF_WORK, autoRedirect: true },
      { path: 'administrative/work-permit-file-type', permission: PermissionsSubModulesEnum.WORK_PERMIT_FILE_TYPE, autoRedirect: true },
      { path: 'user-management/roles', permission: PermissionsSubModulesEnum.ROLE, autoRedirect: true },
      { path: 'user-management/roles/details', permission: PermissionsSubModulesEnum.ROLE, autoRedirect: false },
      { path: 'user-management/users', permission: PermissionsSubModulesEnum.USER, autoRedirect: true },
      { path: 'user-management/user/details', permission: PermissionsSubModulesEnum.USER, autoRedirect: false },
      { path: 'user-management/user/approval', permission: PermissionsSubModulesEnum.USER, autoRedirect: false },
      { path: 'project-management/projects', permission: PermissionsSubModulesEnum.PROJECT, autoRedirect: true },
      { path: 'project-management/projects/ppl-sync', permission: PermissionsSubModulesEnum.PROJECT, autoRedirect: true },
      { path: 'project-management/packages', permission: PermissionsSubModulesEnum.PACKAGE, autoRedirect: false },
      { path: 'project-management/lines', permission: PermissionsSubModulesEnum.LINE, autoRedirect: false },
      { path: 'project-management/towers', permission: PermissionsSubModulesEnum.TOWER, autoRedirect: false },
      { path: 'project-management/towers/sync', permission: PermissionsSubModulesEnum.TOWER, autoRedirect: false, componentPermission: PermissionsEnum.PROJECT_MANAGEMENT_TOWER_SYNC },
      { path: 'project-management/workpackages', permission: PermissionsSubModulesEnum.WORKPACKAGE, autoRedirect: false },
      { path: 'project-management/workpackages/workpackages-entry', permission: PermissionsSubModulesEnum.WORKPACKAGE, autoRedirect: false, componentPermission: PermissionsEnum.PROJECT_MANAGEMENT_WORKPACKAGE_CREATE },
      { path: 'project-management/workpackages/work-permit', permission: PermissionsSubModulesEnum.WORKPERMIT, autoRedirect: false },
      { path: 'project-management/workpackages/work-permit/entry', permission: PermissionsSubModulesEnum.WORKPERMIT, autoRedirect: false, componentPermission: PermissionsEnum.PROJECT_MANAGEMENT_WORKPERMIT_CREATE },
      { path: 'reports/transaction', permission: PermissionsSubModulesEnum.TRANSACTION_DATA, autoRedirect: true },
      { path: 'reports/transaction/data-collection-versions', permission: PermissionsSubModulesEnum.TRANSACTION_DATA, autoRedirect: false },
      { path: 'reports/transaction/form-submission-details', permission: PermissionsSubModulesEnum.TRANSACTION_DATA, autoRedirect: false },
      { path: 'reports/defect-logs', permission: PermissionsSubModulesEnum.DEFECT_LOGS, autoRedirect: true },
    ];

    const routePath = route.routeConfig?.path;
    const currentIndex = routePermissionsMap.findIndex(item => item.path == routePath);

    if (currentIndex === -1) {
      // Invalid path: navigate to authentication
      _snackbarContext.open("Invalid path or permission not mapped.", 'Ok', { duration: STATIC_VALUES.snackbarHideDuration, panelClass: ['error-snackbar'] });
      router.navigate(['/auth']);
      return false;
    }

    // Function to check if user has permission for a given path's permission requirement
    const hasPermission = (permission: PermissionsSubModulesEnum) =>
      userContext.checkSubModulePermissions(permission);

    if (routePermissionsMap[currentIndex].componentPermission) {
      const componentPermission = routePermissionsMap[currentIndex].componentPermission;

      // Check if componentPermission is defined and valid before passing it
      if (componentPermission && userContext.checkPermissions(componentPermission)) {
        return true;
      }
    } else {
      // Check the current route first
      if (hasPermission(routePermissionsMap[currentIndex].permission)) {
        return true;
      }
    }

    // Attempt to find a matching route in both directions (forwards and backwards)
    for (let i = 0; i < routePermissionsMap.length; i++) {
      if (routePermissionsMap[i].autoRedirect && hasPermission(routePermissionsMap[i].permission)) {
        router.navigate([`/${routePermissionsMap[i].path}`]);
        return false;
      }
    }

    // No matching permission found
    _snackbarContext.open("You don't have any permission", 'Ok', { duration: STATIC_VALUES.snackbarHideDuration, panelClass: ['error-snackbar'] });
    router.navigate(['/auth']);
    return false;
  }
}

export const canPerssionRedirect: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userContext = inject(UserService);
  const _snackbarContext = inject(MatSnackBar);
  const router = inject(Router);
  return inject(RedirectGuard).canActivate(userContext, _snackbarContext, router, route);
};
