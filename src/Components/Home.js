import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";


const Home = () => {
    
    const navigate = useNavigate();
    const[data,setData]=useState([]);
    const Baseurl = 'https://jwt-server-n6us.onrender.com/home';


    const Logout = () => {
        let timerInterval
        Swal.fire({
          title: 'Logged Out!',
          html: ' <b></b>.',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            sessionStorage.removeItem("auth_token");
            navigate("/");          }
        })
      };

      useEffect(() => {
        if (!sessionStorage.getItem("auth_token")) {
          navigate("/");
        }
        //Name
        axios.get('https://jwt-server-n6us.onrender.com/home')
        .then(function (response) {
          setData(response.data)
        })
        .catch(function (error) {
          console.log("This is the Error: " + error);
        })
      }, []);

    return (
        <div>
            <header>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Hi, This is Sundaravel!
                            </h1>

                            <p className="mt-1.5 text-sm text-gray-500">
                                I'm MERN Full Stack Developer! 🎉
                            </p>
                        </div>

                        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                            <button
                                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                                type="button"
                                onClick={Logout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>


            <div className='flex align-middle justify-center'>

                <div
                    className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
                >
                    <table
                        className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
                    >
                        
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </th>
                                <th
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
                                    Date of Birth
                                </th>
                                <th
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </th>
                                <th
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </th>
                            </tr>
                        </thead>
                        {data.map(g=>(
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
                                    {g.name}
                                </td>
                                <td
                                    className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                                >
                                    {g.dateOfBirth}
                                </td>
                                <td
                                    className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                                >
                                    {g.email}
                                </td>
                                <td
                                    className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                                >
                                    {g.password}
                                </td>
                            </tr>
                        </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;