import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-user-table',
  standalone: false,
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit{

  @Input() type: string='';
  
  displayedColumns: string[] = [];
  users: User[]=[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

   showCreateForm = false;
   showUpdateForm = false;

   selectedEmployee: User | null = null;

   constructor(private userService: UserService) {}

  ngOnInit(): void {
  this.loadUsers();
  this.setColumns();
    
  }

  setColumns()
  {
    this.displayedColumns=['id', 'firstName', 'lastName'];

    if(this.type==='employee')
    {
     this.displayedColumns.push('role', 'actions');
    }

    else if(this.type==='client')
     {
      this.displayedColumns.push('email','phoneNumber', 'idCardNumber', 'isBlocked', 'actions');
     }
  }



  loadUsers()
  {
    if(this.type==='employee')
      {
        this.userService.getEmployeesDTO().subscribe((data) => 
        {
          this.users=data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator!;
        });
          
      }


      else if(this.type === 'client')
      {
        this.userService.getClients().subscribe((data) => 
          {
            this.users=data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator!;
          });
      }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.firstName.toLowerCase().startsWith(filter.toLowerCase());
    };
  
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteUser(id: number): void {
    this.userService.deleteEmployee(id).subscribe(() => {
      this.loadUsers();
    });
  }





toggleBlockClient(client: any)
{
   if(client.isBlocked)
   {
     this.userService.unblockClient(client.id).subscribe({
        next: () => {
        client.isBlocked = false;
        //this.loadUsers(); //dodatno za osvjezavanje
      },
      error: err => {
        console.error('Error while unblocking client:', err);
      }
    });
     } else {
    this.userService.blockClient(client.id).subscribe({
      next: () => {
        client.isBlocked = true;
        //this.loadUsers(); //dodatno za osvjezavanje
      },
      error: err => {
        console.error('Error while blocking client:', err);
      }
    });
   }
}


openCreateForm()
{
   this.showCreateForm=true;
}

closeCreateForm()
{
    this.showCreateForm=false;
    this.loadUsers();
}


editUser(employee: any)
{
 
  this.selectedEmployee = { ...employee };
  this.showUpdateForm = true;
}

closeUpdateForm()
{
  this.showUpdateForm=false;
  this.loadUsers();
}

onSave(updatedEmployee: User)
{

  this.userService.updateEmployee(updatedEmployee).subscribe(() => {
    this.showUpdateForm = false;
    this.loadUsers();
  });

}









}
