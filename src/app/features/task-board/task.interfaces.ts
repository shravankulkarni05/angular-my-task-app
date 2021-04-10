export interface TaskCategory {
  catId: string;
  catName: string;
  catColor: string;
  catTaskCount: number;
}


export interface TaskData {
    catId: string;
    todo: Task[];
    inProgress: Task[];
    done: Task[];
}

export interface Task {
  id: string;
  name: string;
  desc: string;
  prty: string;
  date: string;
  category: TaskCategory;
  status: string;
//   comments: any[];
//   attachments: any[];
  bookmark: boolean;
}

export interface TaskStatus {
  statusId: string;
  statusName: string;
}

export interface CategoryDialogConfig {
  isEdit: boolean;
  catData?: TaskCategory;
}

export interface TaskDialogConfig {
  isEdit: boolean;
  status: string;
  taskData?: Task;
}
