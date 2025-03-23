import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/dataSlice';

const useFetchData = () => {
  const dispatch = useDispatch();
  const { tenders, companies, services, loading, error } = useSelector((state) => state.data);
  console.log(tenders, companies, services, loading, error)
  useEffect(() => {
    if (services.length == 0 && !loading && !error) {
      dispatch(fetchData()); // Fetch only if no data, not loading, and no error
    }
    // dispatch(fetchData()); // Fetch only if no data, not loading, and no error
  }, [ ]);

  return { tenders, companies, services, loading, error };
};

export default useFetchData;