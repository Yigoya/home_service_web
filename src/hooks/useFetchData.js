import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/dataSlice';

const useFetchData = () => {
  const dispatch = useDispatch();
  const { tenders, companies, services, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    if (!services.length && !loading && !error) {
      dispatch(fetchData()); // Fetch only if no data, not loading, and no error
    }
    // dispatch(fetchData()); // Fetch only if no data, not loading, and no error
  }, [ ]);

  return { tenders, companies, services, loading, error };
};

export default useFetchData;