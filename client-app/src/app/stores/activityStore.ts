import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

class ActivityStore {
	@observable activityRegistry = new Map();
	@observable activity: IActivity | null = null;
	@observable loadingInitial = false;
	@observable submitting = false;
	@observable target = '';

	@computed get activitiesByDate() {
		return this.groupActivityByDate(Array.from(this.activityRegistry.values()));
	}

	groupActivityByDate(activities: IActivity[]) {
		const sortedActivities = activities.sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
		);

		return Object.entries(
			sortedActivities.reduce((activities, activity) => {
				const date = activity.date.split('T')[0];
				activities[date] = activities[date]
					? [...activities[date], activity]
					: [activity];
				return activities;
			}, {} as { [key: string]: IActivity[] })
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

			console.log(this.groupActivityByDate(activities));
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => {
				this.loadingInitial = false;
			});
		}
	};

	@action loadActivity = async (id: string) => {
		let activity = this.getActivity(id);
		if (activity) {
			this.activity = activity;
		} else {
			try {
				this.loadingInitial = true;

				activity = await agent.Activities.details(id);

				runInAction('get activity', () => {
					this.activity = activity;
				});
			} catch (error) {
				console.log(error);
			} finally {
				runInAction(() => {
					this.loadingInitial = false;
				});
			}
		}
	};

	@action clearActivity = () => {
		this.activity = null;
	};

	getActivity = (id: string) => {
		return this.activityRegistry.get(id);
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
				this.submitting = false;
			});
		}
	};

	@action editActivity = async (activity: IActivity) => {
		try {
			this.submitting = true;
			await agent.Activities.update(activity);

			runInAction('edit activity', () => {
				this.activityRegistry.set(activity.id, activity);
				this.activity = activity;
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => {
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
			});
		}
	};
}

export default createContext(new ActivityStore());
