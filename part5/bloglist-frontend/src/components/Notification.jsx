const Notification = ({ config }) => {
	if (!config) {
		return null
	}

	else {
		return (
			<div className={config.className}>
				<p>{config.message}</p>
			</div>
		)
	}
}

export default Notification