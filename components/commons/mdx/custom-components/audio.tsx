import React from 'react'

interface IAudio {
	src: string
}

function Audio({ src }: IAudio) {
	return (
		<figure className="sticky top-16 w-full">
			<audio className="w-full" controls src={src}></audio>
		</figure>
	)
}

export default Audio
