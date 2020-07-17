import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    @action loadActivities = async () => {
        try {
            this.loadingInitial = true;
            const activities = await agent.Activities.list();

            runInAction('loading activities', () => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    };

    @action createActivity = async (activity: IActivity) => {
        try {
            this.submitting = true;
            await agent.Activities.create(activity);

            runInAction('create activity', () => {
                this.activityRegistry.set(activity.id, activity);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.editMode = false;
                this.submitting = false;
            });
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    };

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    };

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    };

    @action cancelFormOpen = () => {
        this.editMode = false;
    };

    @action editActivity = async (activity: IActivity) => {
        try {
            this.submitting = true;
            await agent.Activities.update(activity);

            runInAction('edit activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.editMode = false;
                this.submitting = false;
            });
        }
    };

    @action deleteActivity = async (
        event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        try {
            this.submitting = true;
            this.target = event.currentTarget.name;

            await agent.Activities.delete(id);

            runInAction('delete activity', () => {
                this.activityRegistry.delete(id);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
                this.selectedActivity = undefined;
                this.editMode = false;
            });
        }
    };
}

export default createContext(new ActivityStore());
