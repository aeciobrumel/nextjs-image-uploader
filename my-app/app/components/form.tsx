"use client";

import axios from "axios";
import { ChangeEvent, use, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

export const Form = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [legendField, setLegendField] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            "image/*": []
        }
    });

    const [photoString, setPhotoString] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setPhotoString(URL.createObjectURL(event.target.files[0]));
        }
    };

    //preview da imagem selecionada e upload automático ao selecionar a imagem
    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
            setPhotoString(URL.createObjectURL(acceptedFiles[0]));

        }
    }, [acceptedFiles, selectedFile]);

    const handleSubmit = async () => {

        // Para exibir a imagem selecionada antes do upload
        setPhotoString(URL.createObjectURL(acceptedFiles[0]));

        if (selectedFile) {

            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("legend", legendField);

            const data = await axios.post("https://httpbin.org/post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const pct = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(pct);
                    }
                }
            });
            console.log(data.data);
        }
    };

    return (
        useEffect(() => {
            if (acceptedFiles.length > 0) {
                setSelectedFile(acceptedFiles[0]);
            }
        }, [acceptedFiles]),

        <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
            <h1 className="mb-4 text-lg font-semibold">Enviar imagem</h1>
            <input
                className="my-3 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-100 hover:file:bg-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:file:bg-zinc-100 dark:file:text-zinc-900 dark:hover:file:bg-zinc-300"
                type="file"
                onChange={handleFileChange}
            />
            <div className="bg-gray-10/45 h-45 p-5 border-dashed border-6 flex items-center border-gray-300 rounded-sm" {...getRootProps()}>
                <input type="text" {...getInputProps()} />
                {photoString ? (
                    <img src={photoString} alt="Preview" className="w-full h-full object-cover rounded-sm" />
                ) : (
                    <p className="text-center text-gray-500">Arraste e solte uma imagem aqui, ou clique para selecionar</p>
                )}
            </div>
            <div>Arquivos: {acceptedFiles.length}</div>
            <input
                className="my-3 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400"
                placeholder="Legenda (opcional)"
                type="text"
                value={legendField}
                onChange={(event) => setLegendField(event.target.value)}
            />

            <div className="w-full h-5 bg-green-800 rounded-2xl">
                <div className="h-full bg-green-500 rounded-2xl flex items-center justify-center" style={{ width: `${uploadProgress}%` }} >
                </div>
            </div>
            {uploadProgress < 99 &&
                <div>{uploadProgress.toFixed(0)}% / 100%</div>
            }
            {uploadProgress >= 99 &&
                <div>Upload concluído!</div>
            }
            <button
                className="my-3 block rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={handleSubmit}
            >
                Enviar
            </button>
        </section>
    );
};
