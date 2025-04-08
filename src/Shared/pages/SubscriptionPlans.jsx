import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Star, Shield, Zap, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/axios';
import { setCurrentPlan, setAvailablePlans, setLoading, setError } from '../../store/slices/subscriptionSlice';



const PlanCard = ({ plan, isCurrentPlan, onSelect, loading }) => {
  const getPlanIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'basic':
        return Shield;
      case 'standard':
        return Star;
      case 'pro':
        return Zap;
      case 'premium':
        return Award;
      default:
        return Shield;
    }
  };

  const Icon = getPlanIcon(plan.name);

  return (
    <div
      className={`relative rounded-2xl p-8 ${
        isCurrentPlan
          ? 'bg-blue-600 text-white transform scale-105 shadow-xl'
          : 'bg-white text-gray-900 hover:scale-105 transition-transform duration-300'
      } shadow-lg`}
    >
      {isCurrentPlan && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
          <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            CURRENT PLAN
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <Icon className={`h-8 w-8 ${isCurrentPlan ? 'text-white' : 'text-blue-600'}`} />
          <h3 className="mt-4 text-xl font-bold">{plan.name}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">Starting from</p>
          <p className="text-3xl font-bold">${plan.price}</p>
          <p className="text-sm opacity-80">/{plan.durationMonths} months</p>
        </div>
      </div>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className={`h-5 w-5 ${isCurrentPlan ? 'text-green-300' : 'text-green-500'} mr-3`} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.id)}
        disabled={loading || isCurrentPlan}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          isCurrentPlan
            ? 'bg-white text-blue-600 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          </div>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : (
          'Select Plan'
        )}
      </button>
    </div>
  );
};

export default function SubscriptionPlans() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentPlan, availablePlans, loading } = useSelector((state) => state.subscription);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const planType = user?.role === 'TECHNICIAN' 
    ? 'TECHNICIAN' 
    : user?.role === 'CUSTOMER' 
    ? 'CUSTOMER_TENDER' 
    : 'BUSINESS';

  useEffect(() => {
    fetchPlans();
    if (user) {
      fetchCurrentPlan();
    }
  }, [user]);

  const fetchPlans = async () => {
    try {
      dispatch(setLoading(true));
      const response = await api.get(`/subscriptions/plans?planType=${planType}`);
      dispatch(setAvailablePlans(response.data));
      
    } catch (error) {
      dispatch(setError('Failed to fetch subscription plans'));
      toast.error('Failed to fetch subscription plans');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCurrentPlan = async () => {
    try {
      dispatch(setLoading(true));
      const response = await api.get(`/subscriptions/${user?.role === 'CUSTOMER'  ? 'customer' : planType.toLowerCase()}/${user?.roleId}`);
      dispatch(setCurrentPlan(response.data));
    } catch (error) {
      dispatch(setError('Failed to fetch current subscription'));
      toast.error('Failed to fetch current subscription');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePlanSelection = async (planId) => {
    try {
      setSelectedPlanId(planId);
      dispatch(setLoading(true));

      const endpoint = currentPlan
        ? `/subscriptions/${user?.role === 'CUSTOMER'  ? 'customer' : planType.toLowerCase()}/${user?.roleId}`
        : `/subscriptions/${user?.role === 'CUSTOMER'  ? 'customer' : planType.toLowerCase()}/${user?.roleId}`;

      const method = currentPlan ? 'put' : 'post';

      const response = await api[method](endpoint, { planId });
      dispatch(setCurrentPlan(response.data));
      toast.success(currentPlan ? 'Subscription updated successfully!' : 'Subscription created successfully!');
    } catch (error) {
      toast.error('Failed to update subscription');
    } finally {
      setSelectedPlanId(null);
      dispatch(setLoading(false));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan to grow your business
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {availablePlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={currentPlan?.id === plan.id}
              onSelect={handlePlanSelection}
              loading={loading && selectedPlanId === plan.id}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include 24/7 support and automatic renewal. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}