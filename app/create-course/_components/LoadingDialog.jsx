import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">Loading...</AlertDialogTitle>
        </AlertDialogHeader>
        
        {/* Wrap everything in a div to avoid <h2> inside <p> issue */}
        <div className="flex flex-col items-center py-10">
          <img src="/loading.gif" alt="Loading" width={100} height={100} />
          <h2 className="text-base font-bold text-primary mt-4">
            Please wait... AI is generating the course
          </h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
