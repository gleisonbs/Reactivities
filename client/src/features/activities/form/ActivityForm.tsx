import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadComponent";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loadActivity,
    loading,
    loadingInitial,
    setLoadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id && id !== "new") {
      loadActivity(id).then((a) => setActivity(a!));
    }
    setLoadingInitial(false);
  }, [id, loadActivity, setLoadingInitial]);

  function handleSubmit() {
    if (!activity.id) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  if (loadingInitial) {
    return <LoadingComponent content="Loading..." />;
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          onChange={handleInputChange}
          name="title"
          value={activity?.title}
          placeholder="Title"
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          value={activity?.description}
          placeholder="Description"
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          value={activity?.category}
          placeholder="Category"
        />
        <Form.Input
          type="date"
          onChange={handleInputChange}
          name="date"
          value={activity?.date}
          placeholder="Date"
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          value={activity?.city}
          placeholder="City"
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          value={activity?.venue}
          placeholder="Venue"
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
