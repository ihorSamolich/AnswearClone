import { Button } from "components/ui";
import FileInput from "components/ui/FileInput.tsx";

import { useState } from "react";

const FilterCreateForm = () => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  return (
    <form className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
      <div>
        <FileInput previewImage={previewImage} setPreviewImage={setPreviewImage} />
      </div>

      <div className="flex items-center justify-center">
        <Button size="full">Створити категорію</Button>
      </div>
    </form>
  );
};

export default FilterCreateForm;
