import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faEye, faEyeSlash, faCopy } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState({ id: null, field: '' });

    const togglePassword = () => setShowPassword((s) => !s);

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, []);

    const savePassword = () => {
        if (editingId) {
            const newArr = passwordArray.map((item) => item.id === editingId ? { ...form, id: editingId } : item);
            setpasswordArray(newArr);
            localStorage.setItem('passwords', JSON.stringify(newArr));
            setEditingId(null);
        } else {
            const id = uuidv4();
            const newArr = [...passwordArray, { ...form, id }];
            setpasswordArray(newArr);
            localStorage.setItem('passwords', JSON.stringify(newArr));
        }
        setForm({ site: "", username: "", password: "" });
    }

    const editPassword = (id) => {
        const item = passwordArray.find((p) => p.id === id);
        if (!item) return;
        setForm({ site: item.site || "", username: item.username || "", password: item.password || "" });
        setEditingId(id);
    }
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete");
        if (c) {
            const newArr = passwordArray.filter(item => item.id !== id);
            setpasswordArray(newArr);
            localStorage.setItem('passwords', JSON.stringify(newArr));
        }
    }

    const copyToClipboard = async (text, id, field) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied({ id, field });
        setTimeout(() => setCopied({ id: null, field: '' }), 2000);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="text-white flex justify-center">
                <p className='text-emerald-700 '>Your own password manager</p>
            </div>

            <div className='flex flex-col justify-center items-center mt-8'>

                <input value={form.site} onChange={handleChange} className="w-full max-w-2xl px-3 py-1 border-2 border-amber-100 rounded bg-transparent  text-white" type="text" name='site' id='' placeholder='Enter Website URL' />

                <div className="flex justify-between gap-3 mt-6">
                    <input value={form.username} onChange={handleChange}
                        className=" pr-29 pl-3 py-1 border-2 border-amber-100 rounded bg-transparent  text-white"
                        type="text" name='username'
                        placeholder="Enter Username"
                    />

                    <div className="relative flex-1">
                        <input value={form.password} onChange={handleChange}
                            className="w-full pr-10 pl-3 py-1 border-2 border-amber-100 rounded bg-transparent  text-white"
                            type={showPassword ? 'text' : 'password'} name='password'
                            placeholder="Enter password"
                        />

                        <button
                            type="button"
                            onClick={togglePassword}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 hover:text-white ${showPassword ? 'text-emerald-700' : 'text-amber-100'}`}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                </div>
                <button onClick={savePassword}
                    className="w-full mt-4 max-w-50 px-3 py-1 border-2 border-emerald-700 rounded  bg-emerald-700  placeholder:text-amber-200 hover:bg-emerald-900 hover:border-emerald-700 text-black  flex justify-center items-center gap-3"  >
                    <lord-icon
                        src="https://cdn.lordicon.com/vjgknpfx.json"
                        trigger="hover"
                    >
                    </lord-icon>
                    {editingId ? 'Update' : 'Add'}
                </button>
                <div className='text-black min-w-2xl'>
                    <p className='text-emerald-700 mt-5 rounded-2xl font-bold text-xl underline'>Your Passwords :</p>
                    {passwordArray.length === 0 && <div className='text-white mt-5'>No password to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto rounded-xl  w-full mt-5 overflow-hidden">
                        <thead className='bg-emerald-700'>
                            <tr>
                                <th className='py-2 px-8 text-center text-xs'>Site</th>
                                <th className='py-2 px-8 text-center text-xs'>Username</th>
                                <th className='py-2 px-8 text-center text-xs'>Password </th>
                                <th className='py-2 px-8 text-center text-xs'>Edit/Delete </th>
                            </tr>
                        </thead>
                        <tbody className='bg-emerald-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} className='border'>
                                    <td className='py-2 px-8 text-center text-xs' text-xs>
                                        <div className='flex items-center justify-center gap-2'>
                                            <a href={item.site} target='_blank' rel='noreferrer'>{item.site}</a>
                                            <button aria-label='Copy site' type='button' onClick={() => copyToClipboard(item.site, item.id, 'site')} className='text-amber-700 hover:text-emerald-700'>
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                            {copied.id === item.id && copied.field === 'site' && <span className='text-emerald-700 text-xs'>Copied</span>}
                                        </div>
                                    </td>

                                    <td className='py-2 px-8 text-center text-xs'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span>{item.username}</span>
                                            <button aria-label='Copy username' type='button' onClick={() => copyToClipboard(item.username, item.id, 'username')} className='text-amber-700 hover:text-emerald-700'>
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                            {copied.id === item.id && copied.field === 'username' && <span className='text-emerald-700 text-xs'>Copied</span>}
                                        </div>
                                    </td>

                                    <td className='py-2 px-8 text-center text-xs'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <button aria-label='Copy password' type='button' onClick={() => copyToClipboard(item.password, item.id, 'password')} className='text-amber-700 hover:text-emerald-700'>
                                                <FontAwesomeIcon icon={faCopy} />
                                            </button>
                                            {copied.id === item.id && copied.field === 'password' && <span className='text-emerald-700 text-xs'>Copied</span>}
                                        </div>
                                    </td>

                                    <td className='py-2 px-8 text-center text-xs'>
                                        <span onClick={() => { editPassword(item.id) }}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </span>
                                        <span onClick={() => { deletePassword(item.id) }}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager
