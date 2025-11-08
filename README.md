# Task Management (PLS read this file before proceeding with the code running)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Run the Code

To start a local development server, pls  run:
```cmd
npm install 
```
Then run : 

```cmd
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Project Structure 
I have Used the following structure so I can achieve :
- Clear separation: core services, shared utilities, features, layout
- Scalability: easy to add features
- Maintainability: easier to locate files

src/app/
├── core/                          # services
│   └── services/
│       ├── tasks-state.service.ts
│       └── sidebar.service.ts
│    
│
├── shared/                        # Shared pipes, models
│   ├── pipes/
│   │   └── assignee-name.pipe.ts
│   └── models/                    # Interfaces, types, enums
│       └── task.interface.ts
│
├── features/                      # Feature modules/components
│   ├── dashboard/
│   │   ├── dashboard.ts
│   │   ├── dashboard.html
│   │   ├── dashboard.scss
│   │   └── dashboard.spec.ts
│   ├── tasks/
│   │   ├── tasks.ts
│   │   ├── tasks.html
│   │   ├── tasks.scss
│   │   └── tasks.spec.ts
│   └── task/                      # Individual task 
│       ├── task.ts
│       ├── task.html
│       ├── task.scss
│       └── task.spec.ts
│
├── layout/                        # Layout components
│   ├── navbar/
│   │   ├── navbar.ts
│   │   ├── navbar.html
│   │   ├── navbar.scss
│   │   └── navbar.spec.ts
│   ├── sidebar/
│   │   ├── sidebar.ts
│   │   ├── sidebar.html
│   │   ├── sidebar.scss
│   │   └── sidebar.spec.ts
│   └── overlay/
│       ├── overlay.ts
│       ├── overlay.html
│       ├── overlay.scss
│       └── overlay.spec.ts
│
├── data/                          # Data access layer
│   ├── tasks-crud.ts
│   └── inmemory.api.ts
│
├── app.ts
├── app.html
├── app.scss
├── app.config.ts
├── app.routes.ts
└── app.spec.ts





## Data flow mind map
                    TASK MANAGEMENT APPLICATION - DATA FLOW
                    =========================================

┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA SOURCE LAYER                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────▼───────────────┐
                    │   InmemoryTestData            │
                    │   (inmemory.api.ts)           │
                    │                               │
                    │   • createDb()                │
                    │   • Returns initial tasks[]   │
                    │   • 6 hardcoded tasks         │
                    └───────────────┬───────────────┘
                                    │
                                    │ Initial Data
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                        HTTP INTERCEPTOR LAYER                             │
└───────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────▼─────────────────┐
                    │ HttpClientInMemoryWebApiModule  │
                    │   (app.config.ts)               │
                    │                                 │
                    │   • Intercepts HTTP calls       │
                    │   • Routes to InmemoryTestData  │
                    │   • Simulates API delay (500ms) │
                    └───────────────┬─────────────────┘
                                    │
                                    │ HTTP Requests/Responses
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                         DATA SERVICE LAYER                                │
└───────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────▼───────────────┐
                    │   TasksCrudService            │
                    │   (tasks-crud.service.ts)     │
                    │                               │
                    │   Methods:                    │
                    │   • getTasks() ───────────────┼──► GET /api/tasks
                    │   • addTask(task) ────────────┼──► POST /api/tasks
                    │   • updateTask(task) ─────────┼──► PUT /api/tasks
                    │   • deleteTask(id) ───────────┼──► DELETE /api/tasks/{id}
                    │                               │
                    │   Side Effects (via tap):     │
                    │   • Updates TasksStateService │
                    └───────────────┬───────────────┘
                                    │
                                    │ Updates State
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                      STATE MANAGEMENT LAYER                               │
└───────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────▼───────────────┐
                    │   TasksStateService           │
                    │   (tasks-state.service.ts)    │
                    │                               │
                    │   • _tasks: signal<TaskItem[]>│
                    │   • tasks: readonly signal    │
                    │                               │
                    │   Methods:                    │
                    │   • setTasks(tasks[])         │
                    │   • addTask(task)             │
                    │   • updateTask(task)          │
                    │   • deleteTask(id)            │
                    └───────────────┬───────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    │               │               │
                    │   Reactive Signal Updates     │
                    │               │               │
                    │               │               │
        ┌───────────▼───┐   ┌───────▼──────┐   ┌────▼─────────┐
        │   Dashboard   │   │    Tasks     │   │    Task      │
        │  Component    │   │  Component   │   │  Component   │
        └───────────────┘   └──────────────┘   └──────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           COMPONENT LAYER                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DASHBOARD COMPONENT                                                        │
│  ───────────────────────────────────────────────────────────────────────────│
│                                                                             │
│  Initialization:                                                            │
│    ngOnInit() ──► tasksCrudService.getTasks() ──► TasksStateService         │
│                                                                             │
│  Data Reading:                                                              │
│    tasks = tasksStateService.tasks (signal)                                 │
│    activeTasks = computed(() => filter by Active)                           │
│    closedTasks = computed(() => filter by Closed)                           │
│                                                                             │
│  Reactive Updates:                                                          │
│    effect() ──► watches tasks() ──► updateCharts()                          │
│                                                                             │
│  Display:                                                                   │
│    • Total tasks count                                                      │
│    • Active/Closed counts                                                   │
│    • Status pie chart                                                       │
│    • Category donut chart                                                   │
│    • Timeline line chart                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  TASKS COMPONENT                                                            │
│  ────────────────────────────────────────────────────────────────────────── │
│                                                                             │
│  Initialization:                                                            │
│    ngOnInit() ──► tasksCrudService.getTasks() ──► TasksStateService         │
│                                                                             │
│  Data Reading:                                                              │
│    tasks = tasksStateService.tasks (signal)                                 │
│    newTasks = computed(() => filter by New)                                 │
│    activeTasks = computed(() => filter by Active)                           │
│    closedTasks = computed() => filter by Closed)                            │
│                                                                             │
│  User Actions:                                                              │
│                                                                             │
│    1. ADD TASK:                                                             │
│       User clicks "Add Task"                                                │
│       ──► showDialog()                                                      │
│       ──► User fills form                                                   │
│       ──► handleTaskAction()                                                │
│       ──► tasksCrudService.addTask()                                        │
│       ──► TasksStateService.addTask()                                       │
│       ──► Signal updates ──► UI re-renders                                  │
│                                                                             │
│    2. EDIT TASK:                                                            │
│       Task component emits taskEdit ──► handleTaskEdit()                    │
│       ──► Form populated with task data                                     │
│       ──► User modifies ──► handleTaskAction()                              │
│       ──► tasksCrudService.updateTask()                                     │
│       ──► TasksStateService.updateTask()                                    │
│       ──► Signal updates ──► UI re-renders                                  │
│                                                                             │
│    3. DELETE TASK:                                                          │
│       Task component emits taskDeletion ──► handleTaskDeletion()            │
│       ──► tasksCrudService.deleteTask()                                     │
│       ──► TasksStateService.deleteTask()                                    │
│       ──► Signal updates ──► UI re-renders                                  │
│                                                                             │
│  Display:                                                                   │
│    • Three columns: New, Active, Closed                                     │
│    • Task cards in each column                                              │
│    • Add/Edit dialog form                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  TASK COMPONENT (Child)                                                     │
│  ───────────────────────────────────────────────────────────────────────────│
│                                                                             │
│  Input:                                                                     │
│    task = input.required<TaskItem>()                                        │
│                                                                             │
│  Outputs:                                                                   │
│    taskDeletion = output<number>()                                          │
│    taskEdit = output<TaskItem>()                                            │
│                                                                             │
│  User Actions:                                                              │
│                                                                             │
│    1. DELETE:                                                               │
│       User clicks menu ──► Delete                                           │
│       ──► deleteTask()                                                      │
│       ──► Confirmation dialog                                               │
│       ──► tasksCrudService.deleteTask()                                     │
│       ──► taskDeletion.emit(id) ──► Parent handles                          │
│                                                                             │
│    2. EDIT:                                                                 │
│       User clicks menu ──► Edit                                             │
│       ──► editTask()                                                        │
│       ──► taskEdit.emit(task) ──► Parent handles                            │
│                                                                             │
│  Display:                                                                   │
│    • Task card with details                                                 │
│    • Category badge                                                         │
│    • Assignee initials                                                      │
│    • Estimated hours                                                        │
│    • Due date                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA FLOW PATTERNS                                   │
└─────────────────────────────────────────────────────────────────────────────┘

READ FLOW (Initial Load):
─────────────────────────
Component.ngOnInit()
    │
    ├─► TasksCrudService.getTasks()
    │       │
    │       ├─► HttpClient.get('/api/tasks')
    │       │       │
    │       │       ├─► HttpClientInMemoryWebApiModule intercepts
    │       │       │       │
    │       │       ├─► InmemoryTestData.createDb()
    │       │       │       │
    │       │       └─► Returns tasks[]
    │       │
    │       └─► tap() ──► TasksStateService.setTasks(tasks)
    │                       │
    │                       └─► _tasks.set(tasks)
    │
    └─► Component reads: tasksStateService.tasks (signal)
            │
            └─► Reactive UI updates automatically

WRITE FLOW (Create/Update/Delete):
───────────────────────────────────
User Action (click/form submit)
    │
    ├─► Component method (handleTaskAction, handleTaskDeletion, etc.)
    │       │
    │       ├─► TasksCrudService.[addTask|updateTask|deleteTask]()
    │       │       │
    │       │       ├─► HttpClient.[post|put|delete]()
    │       │       │       │
    │       │       │       ├─► HttpClientInMemoryWebApiModule intercepts
    │       │       │       │       │
    │       │       │       ├─► InmemoryTestData handles CRUD
    │       │       │       │       │
    │       │       │       └─► Returns response
    │       │       │
    │       │       └─► tap() ──► TasksStateService.[addTask|updateTask|deleteTask]()
    │       │                       │
    │       │                       └─► _tasks.update() ──► Signal changes
    │       │
    │       └─► Signal change detected ──► All components using signal auto-update
    │
    └─► UI re-renders with new data

REACTIVE UPDATES:
─────────────────
TasksStateService._tasks (signal)
    │
    ├─► Dashboard.tasks ──► effect() ──► updateCharts()
    │
    ├─► Tasks.tasks ──► computed() ──► newTasks, activeTasks, closedTasks
    │
    └─► Task.task (input) ──► Parent passes updated task

KEY ARCHITECTURAL PATTERNS:
───────────────────────────
1. Single Source of Truth: TasksStateService holds all task data
2. Reactive State: Angular Signals for automatic UI updates
3. Side Effects: TasksCrudService updates state via RxJS tap()
4. Computed Values: Components use computed() for derived data
5. Unidirectional Flow: Data flows down, events flow up
6. Separation of Concerns:
   - Data Layer: InmemoryTestData
   - Service Layer: TasksCrudService
   - State Layer: TasksStateService
   - Presentation Layer: Components

## Resources & Helpers 
I have used the following resources while completing this task:
1- UI Libraries : 
    - https://tailwindcss.com/
    - https://primeng.org/


2- UI/UX the design is inspired from the following resources : 
    - https://www.figma.com/design/sif0MCfHUhMb8Kl4TA6utl/Web-Dashboard-UI---Task---Project-Management--Community-?node-id=12-2&t=oHR1Qa1WcToo7bSm-0
    - https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/html/index.html
    - https://angular-demo.tailadmin.com/
    - https://www.behance.net/gallery/152364503/UI-14-Project-Management-Create-Tasks?tracking_source=search_projects|add+task+popup&l=34

3- Logo used from : 
    - https://logoipsum.com/

4- SVGs, Icons and Charts : 
    - https://www.svgviewer.dev/
    - https://primeng.org/icons
    - https://primeng.org/chart

5- Coding & implementation
    i used the following resources to help me with some parts that i wasn't completely sure of : 
        In-Memory-Web-API
        - https://www.youtube.com/watch?v=swBN7qrYTq0
        - https://www.concretepage.com/angular/in-memory-web-api-angular-standalone
        Tailwind Crash course
        - https://www.youtube.com/watch?v=6biMWgD6_JY&list=PPSV
        Angular Docs
        - https://angular.dev/

6- Issues I Faced and AI Usage 
    - I checked stackoverflow & ChatGTP sometimes to search issues appeared while coding
    - I am using cursor AI as my default coding editor, So i have used its "autocomplete feature" in some small parts like tailwind css classes suggestions. It also helped me create the "Mind map of the data flow" of the app and "the files structure map"
