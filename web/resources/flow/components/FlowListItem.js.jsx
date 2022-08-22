import React, { useEffect, useState } from "react";
import PropTypes, { any } from "prop-types";
import apiUtils from "../../../global/utils/api";

const FlowListItem = ({ flow, history }) => {
	const [tasks, setTasks] = useState([]);
	const [isRetrievingTasks, setIsRetrievingTasks] = useState(false);

	useEffect(() => {
		// Retrieve the list task of flow
		setIsRetrievingTasks(true);
		apiUtils
			.callAPI(`/api/tasks/by-_flow/${flow._id}`)
			.then(res => {
				setTasks(res.tasks);
				setIsRetrievingTasks(false);
			})
			.catch(err => console.log(err));
	}, []);

	if (isRetrievingTasks) return <React.Fragment></React.Fragment>; // Add loading screen
	return (
		<React.Fragment>
			<div onClick={() => history.push(`/flows/${flow._id}`)} className="flow-card-container mouse-point">
				<h3>{flow.name}</h3>
				{tasks.map(task => (
					<p key={task._id}>
						{task.complete ? "[X]" : "[ ]"} {task.name}
					</p>
				))}
			</div>
		</React.Fragment>
	);
};

FlowListItem.propTypes = {
	flow: PropTypes.object.isRequired,
	history: any,
};

export default FlowListItem;
