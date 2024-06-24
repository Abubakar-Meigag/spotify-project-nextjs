'use client'


import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState();
  const uploadModal = useUploadModal();
  const {
      register,
      handleSubmit,
      reset
  } = useForm<FieldValues>({
      defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
      }
  });

  const onChange = (open: boolean) => {
      if(!open) {
            reset(); 
            uploadModal.onClose();
      }
  }

  const OnSubmit: SubmitHandler<FieldValues> = async (values) => {

  }

  return (
    <Modal
      title="Add a song"
      description="Upload mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(OnSubmit)}
      >
            <Input 
              id="title"
              disabled={isLoading}
              {...register('title', { required: true})}
              placeholder="Song title"
            />

      </form>
    </Modal>
  );
};

export default UploadModal;
