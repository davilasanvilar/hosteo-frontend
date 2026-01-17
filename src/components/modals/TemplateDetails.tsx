import { Template } from '../../types/entities';
import { TaskStep } from '../atoms/TaskStep';

export function TemplateDetails({ entity }: { entity?: Template }) {
    return (
        entity && (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}
            >
                {entity.steps.map((step, index) => (
                    <TaskStep key={index} index={index} value={step} />
                ))}
            </div>
        )
    );
}
