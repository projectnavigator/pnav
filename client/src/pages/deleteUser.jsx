import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
    try {
      await customFetch.delete(`/user/delete-user/${params.id}`);
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard/database');
  };