class Brief < ActiveRecord::Base
	 validates_presence_of :name
 	 has_many :questions, :dependent => :destroy
 	 has_many :elements, :dependent => :destroy
 	 has_many :audiences, :dependent => :destroy
 	 has_many :sites, :dependent => :destroy
  	 has_many :comments, :dependent => :destroy
end
