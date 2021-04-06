import React, { ChangeEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    selectedActivity,
    loading,
    closeForm,
  } = activityStore;
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    if (activity.id) {
      updateActivity(activity);
    } else {
      createActivity(activity);
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
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
