import React from 'react';

import ToDoList from '../todo-list';
import AppHeader from '../app-header';
import Search from '../search';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css'

export default class App extends React.Component {

    constructor () {
        super();

        this.maxID = 100;

        this.createTodoItem = (label) => {
            return {
                label,
                important: false,
                done: false,
                id: this.maxID++
            };
        };
        this.state = {
            todoData: [
                this.createTodoItem('drink coffee'),
                this.createTodoItem('make awesome app'),
                this.createTodoItem('learn react')
            ],
            term: '',
            filter: ''
        };

        this.deleteTodoListItem = (id) => {
            this.setState((state) => {
                const index = state.todoData.findIndex((el) => el.id === id);
                const newTodoData = [...state.todoData.slice(0, index), ...state.todoData.slice(index + 1)];
                return {
                    todoData: newTodoData
                };
            });
        };
        this.addItem = (text) => {
            const newItem = this.createTodoItem(text);

            this.setState((state) => {
                const newTodo = [...state.todoData, newItem];
                return {
                    todoData: newTodo
                }
            });
        };
        this.toggleProperty = (arr, id, propName) => {
            const index = arr.findIndex((el) => el.id === id);
                const oldItem = arr[index];
                const newItem = {...oldItem, [propName]: !oldItem[propName]};
                return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]; 

        }
        this.onToggleDone = (id) => {
            this.setState((state) => {
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'done')
                }
            });
        };
        this.onToggleImportant = (id) => {
            this.setState((state) => {
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'important')
                };
            });
        };
        this.search = (items, term) => {
            if (term.length === 0) {
                return items;
            }
            return items.filter((item) => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
            });
        };

        this.onSearchChange = (term) => {
            this.setState({term});
        };

        this.onFilterChange = (filter) => {
            this.setState({filter});
        };

        this.filter = (items, filter) => {
            switch (filter) {
                case 'all': return items;
                case 'active': return items.filter((item) => !item.done);
                case 'done': return items.filter((item) => item.done);
                default: return items;
            }
        }

    };
    render () {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => {return el.done}).length;
        const toDoCount = todoData.length - doneCount;
        return (
            <div className="app">
                <AppHeader toDo={toDoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <Search 
                    onSearchChangeFromApp={this.onSearchChange}/>
                    <ItemStatusFilter 
                    filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>
                
                <ToDoList todos={visibleItems}
                    onDeletedFromApp={this.deleteTodoListItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}/>
                <div>
                    <AddItem addItemFromApp={this.addItem}/>
                </div>
            </div>
        );
    }
}
