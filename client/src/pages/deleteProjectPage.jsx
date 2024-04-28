import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
    const userConfirmation = window.confirm('Are you sure you want to delete this project? This action cannot be undone!');
    if (userConfirmation) {
        try {
            await customFetch.delete(`/project/${params.id}`);
            toast.success('Project deleted successfully');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
        return redirect('/dashboard/dash');
    } else {
        toast.error('Project not deleted');
        return redirect('/dashboard/dash');
    }
};