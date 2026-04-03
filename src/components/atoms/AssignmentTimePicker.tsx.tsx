import dayjs from 'dayjs';
import { conf } from '../../../conf';
import { AssignmentFormFields } from '../../types/forms';
import { CustomTimePicker } from './CustomTimePicker';
import { useSchedulerContext } from '../../hooks/useSchedulerContext';

export function AssignmentTimePicker({
    formFields,
    setFormFields
}: {
    formFields: AssignmentFormFields;
    setFormFields: React.Dispatch<React.SetStateAction<AssignmentFormFields>>;
}) {
    const { taskToAssign } = useSchedulerContext();
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1rem',
                width: '16rem'
            }}
        >
            <CustomTimePicker
                isStart={true}
                date={formFields.startDate}
                updateDate={(value: string) =>
                    setFormFields((oldValue) => {
                        const duration = taskToAssign?.duration
                            ? taskToAssign.duration
                            : 0;
                        return {
                            ...oldValue,
                            startDate: value,
                            endDate: dayjs(value)
                                .add(duration, 'minute')
                                .format(conf.dateInputFormat)
                        };
                    })
                }
            />

            <CustomTimePicker
                isStart={false}
                date={formFields.endDate}
                updateDate={(value: string) =>
                    setFormFields((oldValue) => {
                        const startDate = dayjs(oldValue.startDate);
                        const newEndDate = dayjs(value);
                        let endDate = startDate
                            .set('hour', newEndDate.hour())
                            .set('minute', newEndDate.minute());

                        if (endDate.isBefore(startDate)) {
                            endDate = endDate.add(1, 'day');
                        }
                        return {
                            ...oldValue,
                            endDate: endDate.format(conf.dateInputFormat)
                        };
                    })
                }
            />
        </div>
    );
}
