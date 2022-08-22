import React, { useEffect, useState } from "react";
import PropTypes, { any, string } from "prop-types";

import apiUtils from "../../../global/utils/api";
import { sendCreateNote } from "../noteActions";

const NoteSection = ({ _user, _task, _flow, props }) => {
	const [newNote, setNewNote] = useState("");
	const [notes, setNotes] = useState([]);
	const [isRetrievingNotes, setIsRetrievingNotes] = useState(false);

	useEffect(() => {
		// Retrieve the list of notes
		setIsRetrievingNotes(true);
		apiUtils
			.callAPI(`/api/notes`)
			.then(res => {
				const filteredNotes = res.notes.filter(note => note._task == _task);
				setNotes(filteredNotes);
				setIsRetrievingNotes(false);
			})
			.catch(err => console.log(err));
	}, [_task]);

	const handleSubmit = () => {
		const { dispatch } = props;
		dispatch(
			sendCreateNote({
				_flow,
				_task,
				_user: _user._id,
				content: newNote,
			})
		);
		setNewNote("");
		setNotes([
			...notes,
			{ _id: `${new Date().getTime()}`, _flow, _task, _user: _user._id, content: newNote, created: `${new Date()}` },
		]);
	};

	if (isRetrievingNotes) return <React.Fragment></React.Fragment>; // Add loading screen
	return (
		<React.Fragment>
			{notes.map(note => (
				<div key={note._id}>
					<p>{note._user === _user._id ? `${_user.firstName} ${_user.lastName}` : note._user}</p>
					<p>{` ${new Date(note.created).toLocaleDateString()}  ${new Date(note.created).toLocaleTimeString()}`}</p>
					<p>{note.content}</p>
					<br />
				</div>
			))}
			<textarea
				name="note"
				id="note"
				cols="30"
				rows="5"
				value={newNote}
				onChange={e => setNewNote(e.target.value)}
			></textarea>
			<br />
			<input type="button" value="Add Comment" onClick={handleSubmit} />
			<br /> <br /> <br />
		</React.Fragment>
	);
};

NoteSection.propTypes = {
	_user: PropTypes.object.isRequired,
	_task: string,
	_flow: string,
	props: any,
};

export default NoteSection;
