import React from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthUser from '../hooks/useAuthUser';
import { completeOnboarding } from '../lib/api';
import { LANGUAGES } from '../constants';
import { LoaderIcon, Rabbit, MapPinIcon, ShuffleIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import PageWrapper from '../component/PageWrapper';
import { staggerContainer, fadeInUp } from '../utility/utils';



const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <PageWrapper>
     <motion.div 
     className="min-h-screen bg-base-100 flex items-center justify-center p-4"
     variants={staggerContainer}
        initial="initial"
        animate="animate"
     >
      <motion.div 
      className="card bg-base-200 w-full max-w-3xl shadow-xl"
      variants={fadeInUp}
      >
        <div className="card-body p-6 sm:p-8">
          <motion.h1 
          className="text-2xl sm:text-3xl font-bold text-center mb-6"
           variants={fadeInUp}
          >Complete Your Profile</motion.h1>

          <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
           variants={staggerContainer}
              initial="initial"
              animate="animate"
          >
            
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div 
              className="size-32 rounded-full bg-base-300 overflow-hidden"
              variants={fadeInUp}
              >
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </motion.div>

              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            <motion.div 
            className="form-control"
            variants={fadeInUp}
            >
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </motion.div>

            <motion.div 
            className="form-control"
            variants={fadeInUp}
            >
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </motion.div>

            <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={fadeInUp}
            >
              
              <motion.div 
              className="form-control"
              variants={fadeInUp}
              >
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </motion.div>

              
              <motion.div 
              className="form-control"
              variants={fadeInUp}
              >
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </motion.div>
            </motion.div>

            
            <motion.div 
            className="form-control"
            variants={fadeInUp}
            >
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </motion.div>


            <motion.button 
            className="btn btn-primary w-full" disabled={isPending} type="submit"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
            >
              {!isPending ? (
                <>
                  <Rabbit className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
 </PageWrapper>
  )
};

export default OnboardingPage