import React from 'react'

function ExperienceBlock() {
	return (
		<div className="grid gap-4 md:grid-cols-[250px,1fr] md:gap-8">
			<p className="txt-tertiary mt-1 uppercase tracking-wide">SEP 2023 — PRESENT</p>

			<div>
				<h3 className="h5">Founding Full-Stack Engineer</h3>
				<div className="txt-secondary mt-1 flex items-center gap-1.5">
					<span className="txt-tertiary"> - United States, Remote</span>
				</div>

				<div className="txt-tertiary mt-4 space-y-3 leading-relaxed [&>ul]:list-outside [&>ul]:list-disc [&>ul]:space-y-1.5 [&>ul]:pl-3">
					<p>
						Dimension is a collaboration platform for modern engineering teams. It bridges the gap between
						communication, cloud, code, projects, and more—with an incredible developer experience.
					</p>
					<ul>
						<li>
							Led the rewrite from the MVP version, which was previously fragile with numerous bugs and
							technical debt. Convinced the team to transition to a new monorepo project with a solid
							foundation, ensuring code quality and developing conventions to maintain consistency and
							reliability across the team.
						</li>
						<li>
							Led the transition of the application to a local-first setup using IndexedDB, significantly
							improving speed by reducing query and update times from about 500ms to nearly instant
							(around 5ms).
						</li>
						<li>
							Developed a comprehensive front-end design system with well-structured and easy-to-use APIs,
							equipped with accessibility and keyboard navigation. This system has been praised by
							colleagues for enhancing the development experience and accelerating feature development.
						</li>
						<li>
							Led the hiring process for software engineers, including designing interview processes and
							evaluating candidates to build a strong development team.
						</li>
						<li>
							Configured various developer quality-of-life features, such as ESLint plugins for sorting
							and auto-removing imports, set up Commitlint for consistent commit messages, and implemented
							Husky and GitHub Actions for type checking and testing using Vitest. *Basically bringing my
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/theodorusclarence/ts-nextjs-tailwind-starter"
								className="default-ring txt-tertiary cursor-newtab inline-block text-neutral-300 underline decoration-[color-mix(in_srgb,_currentColor_30%,_#171717)] transition-colors hover:decoration-current focus:decoration-current active:decoration-[color-mix(in_srgb,_currentColor_65%,_#171717)]"
							>
								starter features
							</a>{' '}
							of the company 😉
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ExperienceBlock
