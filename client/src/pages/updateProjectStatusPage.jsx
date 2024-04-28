import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
    try {
      await customFetch.patch(`/project/status/${params.id}`);
      toast.success('Status Updated');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard');
  };  