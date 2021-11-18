import Component from "@ember/component";
import I18n from "I18n";
import UppyUploadMixin from "discourse/mixins/uppy-upload";
import discourseComputed from "discourse-common/utils/decorators";

export default Component.extend(UppyUploadMixin, {
  tagName: "span",
  type: "backup",
  // local backups
  useChunkedUploads: true,

  // s3 backups
  // useMultipartUploadsIfAvailable: true,
  uploadRootPath: "/admin/backups",
  uploadUrl: "/admin/backups/upload",

  @discourseComputed("uploading", "uploadProgress")
  uploadButtonText(uploading, progress) {
    return uploading
      ? I18n.t("admin.backups.upload.uploading_progress", { progress })
      : I18n.t("admin.backups.upload.label");
  },

  validateUploadedFilesOptions() {
    return { skipValidation: true };
  },

  uploadDone(responseData) {
    this.done(responseData.fileName || responseData.file_name);
  },
});
