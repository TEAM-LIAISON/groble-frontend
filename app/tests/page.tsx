import TextField from "@/components/text-field";

export default function Page() {
  return (
    <>
      <section>
        <div>
          <TextField
            label="Label"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            maxLength={1000}
          />
        </div>
        <div>
          <TextField
            label="Label"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            defaultValue="Value"
            maxLength={1000}
          />
        </div>
        <div>
          <TextField
            label="Label"
            labelHelper="Label helper"
            helperText="Helper Text"
            defaultValue="편집 중입니다"
            maxLength={1000}
          />
        </div>
        <div>
          <TextField
            label="10자 이상"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            minLength={10}
            maxLength={20}
          />
        </div>
        <div>
          <TextField
            label="Disabled"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            minLength={10}
            maxLength={20}
            disabled
          />
        </div>
      </section>
      <section>
        <div>
          <TextField
            label="Label"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            maxLength={1000}
            variantType="line"
          />
        </div>
        <div>
          <TextField
            label="Label"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            defaultValue="Value"
            maxLength={1000}
            variantType="line"
          />
        </div>
        <div>
          <TextField
            label="Label"
            labelHelper="Label helper"
            helperText="Helper Text"
            defaultValue="편집 중입니다"
            maxLength={1000}
            variantType="line"
          />
        </div>
        <div>
          <TextField
            label="10자 이상"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            minLength={10}
            maxLength={20}
            variantType="line"
          />
        </div>
        <div>
          <TextField
            label="Disabled"
            labelHelper="Label helper"
            helperText="Helper Text"
            placeholder="Placeholder"
            minLength={10}
            maxLength={20}
            disabled
            variantType="line"
          />
        </div>
      </section>
    </>
  );
}
