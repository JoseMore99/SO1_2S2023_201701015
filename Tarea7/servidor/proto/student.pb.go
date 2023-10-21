// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.12.4
// source: student.proto

package student

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type StudentInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Carnet   int32  `protobuf:"varint,1,opt,name=carnet,proto3" json:"carnet,omitempty"`
	Nombre   string `protobuf:"bytes,2,opt,name=nombre,proto3" json:"nombre,omitempty"`
	Curso    string `protobuf:"bytes,3,opt,name=curso,proto3" json:"curso,omitempty"`
	Nota     int32  `protobuf:"varint,4,opt,name=nota,proto3" json:"nota,omitempty"`
	Semestre string `protobuf:"bytes,5,opt,name=semestre,proto3" json:"semestre,omitempty"`
	Year     int32  `protobuf:"varint,6,opt,name=year,proto3" json:"year,omitempty"`
}

func (x *StudentInfo) Reset() {
	*x = StudentInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_student_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *StudentInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*StudentInfo) ProtoMessage() {}

func (x *StudentInfo) ProtoReflect() protoreflect.Message {
	mi := &file_student_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use StudentInfo.ProtoReflect.Descriptor instead.
func (*StudentInfo) Descriptor() ([]byte, []int) {
	return file_student_proto_rawDescGZIP(), []int{0}
}

func (x *StudentInfo) GetCarnet() int32 {
	if x != nil {
		return x.Carnet
	}
	return 0
}

func (x *StudentInfo) GetNombre() string {
	if x != nil {
		return x.Nombre
	}
	return ""
}

func (x *StudentInfo) GetCurso() string {
	if x != nil {
		return x.Curso
	}
	return ""
}

func (x *StudentInfo) GetNota() int32 {
	if x != nil {
		return x.Nota
	}
	return 0
}

func (x *StudentInfo) GetSemestre() string {
	if x != nil {
		return x.Semestre
	}
	return ""
}

func (x *StudentInfo) GetYear() int32 {
	if x != nil {
		return x.Year
	}
	return 0
}

type ReplyInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Info string `protobuf:"bytes,1,opt,name=info,proto3" json:"info,omitempty"`
}

func (x *ReplyInfo) Reset() {
	*x = ReplyInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_student_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ReplyInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ReplyInfo) ProtoMessage() {}

func (x *ReplyInfo) ProtoReflect() protoreflect.Message {
	mi := &file_student_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ReplyInfo.ProtoReflect.Descriptor instead.
func (*ReplyInfo) Descriptor() ([]byte, []int) {
	return file_student_proto_rawDescGZIP(), []int{1}
}

func (x *ReplyInfo) GetInfo() string {
	if x != nil {
		return x.Info
	}
	return ""
}

var File_student_proto protoreflect.FileDescriptor

var file_student_proto_rawDesc = []byte{
	0x0a, 0x0d, 0x73, 0x74, 0x75, 0x64, 0x65, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12,
	0x07, 0x73, 0x74, 0x75, 0x64, 0x65, 0x6e, 0x74, 0x22, 0x97, 0x01, 0x0a, 0x0b, 0x53, 0x74, 0x75,
	0x64, 0x65, 0x6e, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x16, 0x0a, 0x06, 0x63, 0x61, 0x72, 0x6e,
	0x65, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x06, 0x63, 0x61, 0x72, 0x6e, 0x65, 0x74,
	0x12, 0x16, 0x0a, 0x06, 0x6e, 0x6f, 0x6d, 0x62, 0x72, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x06, 0x6e, 0x6f, 0x6d, 0x62, 0x72, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x63, 0x75, 0x72, 0x73,
	0x6f, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x63, 0x75, 0x72, 0x73, 0x6f, 0x12, 0x12,
	0x0a, 0x04, 0x6e, 0x6f, 0x74, 0x61, 0x18, 0x04, 0x20, 0x01, 0x28, 0x05, 0x52, 0x04, 0x6e, 0x6f,
	0x74, 0x61, 0x12, 0x1a, 0x0a, 0x08, 0x73, 0x65, 0x6d, 0x65, 0x73, 0x74, 0x72, 0x65, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x73, 0x65, 0x6d, 0x65, 0x73, 0x74, 0x72, 0x65, 0x12, 0x12,
	0x0a, 0x04, 0x79, 0x65, 0x61, 0x72, 0x18, 0x06, 0x20, 0x01, 0x28, 0x05, 0x52, 0x04, 0x79, 0x65,
	0x61, 0x72, 0x22, 0x1f, 0x0a, 0x09, 0x72, 0x65, 0x70, 0x6c, 0x79, 0x49, 0x6e, 0x66, 0x6f, 0x12,
	0x12, 0x0a, 0x04, 0x69, 0x6e, 0x66, 0x6f, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x69,
	0x6e, 0x66, 0x6f, 0x32, 0x4f, 0x0a, 0x0e, 0x53, 0x74, 0x75, 0x64, 0x65, 0x6e, 0x74, 0x53, 0x65,
	0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x3d, 0x0a, 0x0f, 0x53, 0x61, 0x76, 0x65, 0x53, 0x74, 0x75,
	0x64, 0x65, 0x6e, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x14, 0x2e, 0x73, 0x74, 0x75, 0x64, 0x65,
	0x6e, 0x74, 0x2e, 0x53, 0x74, 0x75, 0x64, 0x65, 0x6e, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x1a, 0x12,
	0x2e, 0x73, 0x74, 0x75, 0x64, 0x65, 0x6e, 0x74, 0x2e, 0x72, 0x65, 0x70, 0x6c, 0x79, 0x49, 0x6e,
	0x66, 0x6f, 0x22, 0x00, 0x42, 0x0c, 0x5a, 0x0a, 0x2e, 0x2f, 0x3b, 0x73, 0x74, 0x75, 0x64, 0x65,
	0x6e, 0x74, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_student_proto_rawDescOnce sync.Once
	file_student_proto_rawDescData = file_student_proto_rawDesc
)

func file_student_proto_rawDescGZIP() []byte {
	file_student_proto_rawDescOnce.Do(func() {
		file_student_proto_rawDescData = protoimpl.X.CompressGZIP(file_student_proto_rawDescData)
	})
	return file_student_proto_rawDescData
}

var file_student_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_student_proto_goTypes = []interface{}{
	(*StudentInfo)(nil), // 0: student.StudentInfo
	(*ReplyInfo)(nil),   // 1: student.replyInfo
}
var file_student_proto_depIdxs = []int32{
	0, // 0: student.StudentService.SaveStudentInfo:input_type -> student.StudentInfo
	1, // 1: student.StudentService.SaveStudentInfo:output_type -> student.replyInfo
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_student_proto_init() }
func file_student_proto_init() {
	if File_student_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_student_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*StudentInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_student_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ReplyInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_student_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_student_proto_goTypes,
		DependencyIndexes: file_student_proto_depIdxs,
		MessageInfos:      file_student_proto_msgTypes,
	}.Build()
	File_student_proto = out.File
	file_student_proto_rawDesc = nil
	file_student_proto_goTypes = nil
	file_student_proto_depIdxs = nil
}