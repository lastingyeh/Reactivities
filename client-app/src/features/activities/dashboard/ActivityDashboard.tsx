import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityStore from '../../../app/stores/activityStore';

const ActivityDashboard: React.FC = () => {
    const { editMode, selectedActivity } = useContext(ActivityStore);

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && (
                    <ActivityForm
                        activity={selectedActivity!}
                        key={(selectedActivity && selectedActivity.id) || 0}
                    />
                )}
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);
