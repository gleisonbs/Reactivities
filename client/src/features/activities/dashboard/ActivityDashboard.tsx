import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadComponent";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size === 0) {
      loadActivities();
    }
  }, [loadActivities, activityRegistry.size]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading activities" />;
  }

  return <ActivityList />;
});
