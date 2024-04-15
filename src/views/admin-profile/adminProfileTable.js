import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { FaRegUserCircle } from "react-icons/fa";
import { Card } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const AdminProfileTable = () => {


    return (
        <Card sx={{ px: "20px", py: "40px" }}>
            <form className=' md:ml-6'>
                <div className="space-y-12">
                    {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="janesmith"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <FaRegUserCircle className="h-10 w-10 text-gray-300" aria-hidden="true" />
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <FaRegUserCircle className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Admin Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Admin can change their personal data</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        // autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 outline-none ring-[#4f706557] placeholder:text-gray-400   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        // autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 outline-none ring-[#4f706557] placeholder:text-gray-400   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 outline-none ring-[#4f706557] placeholder:text-gray-400   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Current password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="Current password"
                                        id="Current-password"
                                        // autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 outline-none ring-[#4f706557] placeholder:text-gray-400   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    New password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="New password"
                                        id="New-password"
                                        // autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 outline-none ring-[#4f706557] placeholder:text-gray-400   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="password"
                                        id="Confirm-password"
                                        // autoComplete="Confirm password"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 outline-none ring-[#4f706557] placeholder:text-gray-400   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            We'll always let you know about important changes, but you pick what else you want to hear about.
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-[#4F786A] focus:ring-[#4F786A]"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when new user registered.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-[#4F786A] focus:ring-[#4F786A]"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-[#4F786A] focus:ring-[#4F786A]"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-[#4F786A] focus:ring-[#4F786A]"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-[#4F786A] focus:ring-[#4F786A]"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-[#4F786A] focus:ring-[#4F786A]"
                                        />
                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-[#4F786A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4F786A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default AdminProfileTable