import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PauseCircle, PlayCircle, Loader2, AlertTriangle, CheckCircle2, Settings, Phone, Mail } from 'lucide-react';
import api from '../../api';

export default function AdminReservationSettings({ token }) {
  const [reservationsPaused, setReservationsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    api.getReservationSettings()
      .then((data) => {
        setReservationsPaused(Boolean(data?.reservations_paused));
      })
      .catch((err) => {
        console.error(err);
        setFeedback({ type: 'error', message: 'Failed to load reservation settings.' });
      })
      .finally(() => setLoading(false));
  }, []);

  const togglePause = async () => {
    setToggling(true);
    setFeedback(null);
    try {
      const result = await api.updateReservationSettings({ reservations_paused: !reservationsPaused });
      setReservationsPaused(Boolean(result?.reservations_paused));
      setFeedback({
        type: 'success',
        message: result?.reservations_paused
          ? 'Reservations have been paused. Customers will see a "paused" notice.'
          : 'Reservations are now active. Customers can book again.',
      });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Failed to update. Please try again.' });
    }
    setToggling(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="skeleton h-8 w-1/3 mb-2" /><div className="skeleton h-4 w-1/2" /></div>
        <div className="skeleton h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Reservation Settings</h1>
        <p className="text-neutral-500 text-sm mt-1">Control reservation availability for your restaurant</p>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl border text-sm ${
            feedback.type === 'success'
              ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
              : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          {feedback.message}
        </motion.div>
      )}

      {/* Pause Reservations Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm dark:shadow-none overflow-hidden"
      >
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <Settings size={20} className="text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-neutral-900 dark:text-white font-semibold">Pause Reservations</h2>
            <p className="text-neutral-500 text-xs mt-0.5">Temporarily stop accepting new reservations</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                reservationsPaused
                  ? 'bg-red-500/10'
                  : 'bg-green-500/10'
              }`}>
                {reservationsPaused
                  ? <PauseCircle size={28} className="text-red-500 dark:text-red-400" />
                  : <PlayCircle size={28} className="text-green-500 dark:text-green-400" />
                }
              </div>
              <div>
                <p className="text-neutral-900 dark:text-white font-semibold text-lg">
                  {reservationsPaused ? 'Reservations Paused' : 'Reservations Active'}
                </p>
                <p className="text-neutral-500 text-sm mt-0.5">
                  {reservationsPaused
                    ? 'Customers currently cannot make new reservations online.'
                    : 'Customers can make reservations through the website.'
                  }
                </p>
              </div>
            </div>
            <span className={`inline-block w-3.5 h-3.5 rounded-full flex-shrink-0 ${
              reservationsPaused ? 'bg-red-500 animate-pulse' : 'bg-green-500'
            }`} />
          </div>

          {/* Toggle Button */}
          <button
            onClick={togglePause}
            disabled={toggling}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold transition-all border disabled:opacity-60 disabled:cursor-not-allowed ${
              reservationsPaused
                ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20'
                : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20'
            }`}
          >
            {toggling ? (
              <Loader2 size={20} className="animate-spin" />
            ) : reservationsPaused ? (
              <PlayCircle size={20} />
            ) : (
              <PauseCircle size={20} />
            )}
            {reservationsPaused ? 'Resume Reservations' : 'Pause Reservations'}
          </button>

          {/* Info Note */}
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <p className="font-medium text-neutral-900 dark:text-white mb-1">What happens when paused?</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>The reservation form will be hidden from customers</li>
                <li>A "Reservations Paused" message will be shown instead</li>
                <li>Customers will see your phone and email as alternatives</li>
                <li>Existing reservations will not be affected</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Info Preview */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm dark:shadow-none">
        <h3 className="text-neutral-900 dark:text-white font-semibold mb-3">Customer Fallback Contact</h3>
        <p className="text-neutral-500 text-xs mb-4">When reservations are paused, customers will see these contact options:</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg px-4 py-3">
            <Phone size={16} className="text-amber-500" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">(613) 789-6777</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg px-4 py-3">
            <Mail size={16} className="text-amber-500" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">infomasakaliottawa@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
