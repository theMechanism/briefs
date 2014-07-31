class CreateBriefs < ActiveRecord::Migration
  def change
    create_table :briefs do |t|
      t.string :name
      t.date :issue_date
      t.date :due_date
      t.string :contact_name
      t.string :contact
      t.text :instructions
      t.string :website
      t.integer :budget

      t.string :type_of_work

      t.text :client_information
      t.string :purpose
      t.string :internal_res
      t.string :competitors
     

      t.timestamps
    end
  end
end
