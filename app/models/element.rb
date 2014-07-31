class Element < ActiveRecord::Base
	  belongs_to :brief
	  has_many :features, :dependent => :destroy
	  accepts_nested_attributes_for :features, allow_destroy: true
end
