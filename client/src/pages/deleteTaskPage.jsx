import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
    const userConfirmation = window.confirm('Are you sure you want to delete this task? This action cannot be undone!');
    if (userConfirmation) {
        try {
            await customFetch.delete(`/task/${params.id}`);
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
        return redirect('/dashboard');
    } else {
        toast.error('Task not deleted');
        return redirect('/dashboard');
    }
};