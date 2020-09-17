import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Loader from '../loader';
import {
  restaurantsListSelector,
  restaurantsLoadingSelector,
  restaurantsLoadedSelector,
} from '../../redux/selectors';
import { loadRestaurants } from '../../redux/actions';

const useMyHookCounter = () => {
  const [count, setCount] = React.useState(0);
  const increase = React.useCallback(() => {
    setCount(count + 1);
  }, [setCount, count]);
  const decrease = React.useCallback(() => {
    setCount(count - 1);
  }, [setCount, count]);
  return [count, increase, decrease];
};

export const Restaurants = () => {
  const restaurants = useSelector(restaurantsListSelector);
  const loading = useSelector(restaurantsLoadingSelector);
  const loaded = useSelector(restaurantsLoadedSelector);
  const dispatch = useDispatch();
  const [count, increaseCount, decreaseCount] = useMyHookCounter();

  useEffect(() => {
    if (!loading && !loaded) dispatch(loadRestaurants());
  }, []); // eslint-disable-line

  if (loading || !loaded) return <Loader />;

  const tabs = restaurants.map((restaurant) => ({
    title: restaurant.name,
    content: <Restaurant {...restaurant} />,
  }));

  return (
    <>
      <div onClick={increaseCount} onContextMenu={decreaseCount}>
        {count}
      </div>
      <Tabs tabs={tabs} />
    </>
  );
};

export default Restaurants;
