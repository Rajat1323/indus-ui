import { Pipe, PipeTransform } from '@angular/core';
import { Role } from 'src/app/modules/user-management/models/role.model';
import { IUserList } from 'src/app/modules/user-management/models/user.model';

@Pipe({
    name: 'filterRole',
    standalone: true,
    pure: false
})
export class FilterRolePipe implements PipeTransform {

    transform(users: IUserList[], role: Role): IUserList[] {
        if (!users || !role) {
            return users;
        }

        return users.filter(user => user.userRoles.some(userRole => userRole.role.rowId === role.rowId));
    }
}
