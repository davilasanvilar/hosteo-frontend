import { Tabs } from '@mantine/core';
import { TaskOrTemplateCard } from './TaskOrTemplateCard';
import { Task } from '../../types/entities';

export function TasksSection({
    tasks,
    onEdit,
    onDelete
}: {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <Tabs.Panel
            value="tasks"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
                justifyItems: 'center',
                gap: '1rem',
                rowGap: '2rem',
                width: '100%',
                overflowY: 'auto',
                height: '100%',
                paddingRight: '0.4rem'
            }}
        >
            {tasks.map((task) => (
                <TaskOrTemplateCard
                    item={task}
                    key={task.id}
                    onEdit={() => onEdit(task.id)}
                    onDelete={() => onDelete(task.id)}
                />
            ))}
        </Tabs.Panel>
    );
}
